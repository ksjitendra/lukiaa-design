import React, {useRef, useState, useEffect} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
// Fixed typo (CustumButton -> CustomButton)
import {colors} from '../constants/colors';
import {useCommonStyles} from '../common/CommonStyle';
import {Fonts} from '../assets/fonts/Customfont';
import {CustomImages} from '../assets/images';
import {useDispatch} from 'react-redux';
import {login} from '../redux/slice/authSlice';
import {useMutation} from '@tanstack/react-query';
import {OtpVerificationApi} from '../axios/PostApis';
import {AppLoaderRef} from '../navigation/RootScreen';
import {CustomToaster} from '../components/toaster/CustomToaster';
import {ALERT_TYPE} from 'react-native-alert-notification';
import {ScreenProps} from '../navigation/Stack';
import CustomButton from '../common/CustumButton';

// Define props for type safety
type AccountVerifyScreenProps = ScreenProps<'AccountVerify'>;

const AccountVerifyScreen: React.FC<AccountVerifyScreenProps> = ({
  navigation,
  route,
}) => {
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(''));
  const inputsRef = useRef<(TextInput | null)[]>([]);
  const {title: titleStyle} = useCommonStyles();
  const dispatch = useDispatch(); // Fixed typo (disptach -> dispatch)
  const {top, bottom} = useSafeAreaInsets();

  const {userId} = route.params;
  console.log(userId, 'userid');

  const handleChange = (text: string, index: number) => {
    if (/^[0-9]$/.test(text) || text === '') {
      const newOtp = [...otp];
      newOtp[index] = text;
      setOtp(newOtp);

      if (text && index < 5) {
        inputsRef.current[index + 1]?.focus();
      } else if (text === '' && index > 0) {
        inputsRef.current[index - 1]?.focus();
      }
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace') {
      const newOtp = [...otp];
      if (otp[index] !== '') {
        newOtp[index] = '';
        setOtp(newOtp);
        if (index > 0) {
          inputsRef.current[index - 1]?.focus();
        }
      } else if (index > 0) {
        newOtp[index - 1] = '';
        setOtp(newOtp);
        inputsRef.current[index - 1]?.focus();
      }
    }
  };

  const handleFocus = (index: number) => {
    for (let i = 0; i < index; i++) {
      if (otp[i] === '') {
        inputsRef.current[i]?.focus();
        return;
      }
    }
  };

  const {mutate, isLoading} = useMutation({
    mutationFn: OtpVerificationApi,
    onMutate: () => {
      AppLoaderRef.current?.start();
    },
    onSuccess: data => {
      console.log(data, 'data');
      CustomToaster({
        message: 'Account Verified Successfully!',
        type: ALERT_TYPE.SUCCESS,
      });
      dispatch(login({username: data?.username, token: data?.data?.token}));
      navigation.navigate('ProfileScreen'); // Navigate to profile screen for verification
    },
    onError: (error: Error) => {
      console.error('OTP Verification Error:', error);
      CustomToaster({
        message: error.message || 'Failed to verify OTP. Please try again.',
        type: ALERT_TYPE.DANGER,
      });
    },
    onSettled: () => {
      AppLoaderRef.current?.stop();
    },
  });

  const handleSubmit = () => {
    const enteredOtp = otp.join('');
    if (enteredOtp.length === 6) {
      mutate({userId, otp: enteredOtp});
    } else {
      Alert.alert('Error', 'Please enter the full 6-digit OTP');
    }
  };

  // Auto-submit when all OTP digits are filled
  useEffect(() => {
    if (otp.every(digit => digit !== '')) {
      handleSubmit();
    }
  }, [otp, userId]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.keyboardAvoidingView}>
      <ScrollView
        style={[styles.scrollView, {marginTop: top, marginBottom: bottom}]}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled">
        <View style={styles.innerContent}>
          <View style={styles.header}>
            <Text style={[titleStyle, styles.title]}>Account Verification</Text>
          </View>
          <View style={styles.otpContent}>
            <Image style={styles.logo} source={CustomImages.verifyLogo} />
            <Text style={styles.subtitle}>Enter verification code</Text>
            <View style={styles.otpContainer}>
              {otp.map((digit, index) => (
                <TextInput
                  key={index}
                  ref={el => (inputsRef.current[index] = el)}
                  value={digit}
                  onChangeText={text => handleChange(text, index)}
                  onKeyPress={e => handleKeyPress(e, index)}
                  onFocus={() => handleFocus(index)}
                  keyboardType="number-pad"
                  maxLength={1}
                  style={styles.inputBox}
                />
              ))}
            </View>
            <CustomButton
              title="Submit"
              btnStyle={styles.button}
              onPress={handleSubmit}
              disabled={isLoading || otp.some(digit => digit === '')}
              showIcon
            />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  innerContent: {
    paddingHorizontal: 24,
    justifyContent: 'center',
    flex: 1,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontFamily: Fonts.inter600,
    fontSize: 24,
    textAlign: 'center',
    color: colors.textPrimary,
  },
  subtitle: {
    fontFamily: Fonts.inter400,
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 10,
    color: colors.textSecondary,
  },
  otpContent: {
    alignItems: 'center',
  },
  logo: {
    width: 50,
    height: 50,
    marginBottom: 16,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
    paddingHorizontal: 10,
  },
  inputBox: {
    width: 40,
    height: 40,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: colors.gradientstartColor,
    marginHorizontal: 5, // Added spacing
    fontSize: 14,
    lineHeight: 14,
    textAlign: 'center',
    fontFamily: Fonts.inter500,
    color: colors.textPrimary,
  },
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
});

export default AccountVerifyScreen;
