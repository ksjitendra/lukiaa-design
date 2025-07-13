import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Image,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import CustomInput from '../common/CustomInput';
import {Fonts} from '../assets/fonts/Customfont';
import CardWrapper from '../common/CardWrapper';
import {colors} from '../constants/colors';
import CustomButton from '../common/CustumButton';
import {CustomImages} from '../assets/images';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {LoginApi} from '../axios/PostApis';
import {useMutation} from '@tanstack/react-query';
import {AppLoaderRef} from '../navigation/RootScreen';
import {CustomToaster} from '../components/toaster/CustomToaster';
import {ALERT_TYPE} from 'react-native-alert-notification';
import AnimatedTextInput from '../components/AnimatedTextInput';
import ErrorText from '../common/ErrorText';
import {useToast} from 'react-native-toast-notifications';
import {ScreenProps} from '../navigation/Stack';
import {useDispatch} from 'react-redux';
import {login} from '../redux/slice/authSlice';
import {
  ProfileSetupCompleted,
  EngagementShown,
} from '../redux/slice/userProfile';

// Define type to match LoginApi
type LoginFormData = {
  identifier: string;
  password: string;
};

const LoginScreen: React.FC<ScreenProps<'Login'>> = ({navigation}) => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<LoginFormData>({
    defaultValues: {
      identifier: '',
      password: '',
    },
  });
  const identifierRef = useRef(null);
  const passwordRef = useRef(null);
  const {top, bottom} = useSafeAreaInsets();
  const [show, setShow] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    StatusBar.setBackgroundColor(colors.accent);
    StatusBar.setBarStyle('dark-content');
  }, []);

  // ✅ Login mutation
  const toast = useToast();

  const {mutate} = useMutation({
    mutationFn: LoginApi,
    onMutate: () => {
      AppLoaderRef.current?.start(); // Show loader
    },
    onSuccess: data => {
      console.log('Login Success:', data);
      CustomToaster({
        type: ALERT_TYPE.SUCCESS,
        message: 'Login Successfully!!!',
      });
      dispatch(EngagementShown());
      dispatch(login({username: data?.username, token: data?.data?.token}));
      if (data?.data?.isProfileComplete) {
        dispatch(ProfileSetupCompleted());
      } else {
        navigation.navigate('ProfileScreen');
      }
    },
    onError: error => {
      console.error('Login Error:', error);
      CustomToaster({
        type: ALERT_TYPE.DANGER,
        message: error.message ?? 'Something went wrong.',
      });
    },
    onSettled: () => {
      AppLoaderRef.current?.stop(); // Hide loader
    },
  });

  const onSubmit = (data: LoginFormData) => {
    console.log('Login payload:', data);
    // navigation.navigate('Engaging');
    mutate(data); // Call the mutation with form data
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex: 1}}>
      <StatusBar backgroundColor={colors.accent} barStyle="dark-content" />
      <ScrollView
        style={[styles.scrollView, {marginTop: top, marginBottom: bottom}]}
        // contentContainerStyle={{flexGrow: 1}}
        showsVerticalScrollIndicator
        keyboardShouldPersistTaps="handled">
        <View style={styles.innerContent}>
          <View style={styles.header}>
            <Image source={CustomImages.transparent_logo} style={styles.logo} />
          </View>
          <CardWrapper style={{paddingVertical: 20}}>
            <View style={styles.container}>
              <View style={styles.inputContainer}>
                <View>
                  <Controller
                    control={control}
                    name="identifier"
                    rules={{
                      required: 'Email/Phone is required',
                      pattern: {
                        // Supports email or phone number
                        value:
                          /^(?:[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}|[0-9]{10})$/,
                        message: 'Enter a valid email or 10-digit phone number',
                      },
                    }}
                    render={({
                      field: {onChange, value},
                      fieldState: {isTouched},
                    }) => (
                      <AnimatedTextInput
                        placeholder="Email/Phone"
                        // placeholderTextStyle={[
                        //   isTouched && {color: colors.accent},
                        // ]}
                        defaultValue={value}
                        onChangeText={text => onChange(text.toLowerCase())}
                        onFocusPress={() => identifierRef?.current?.focus()}
                        borderColor={
                          errors.identifier
                            ? colors.errorAlert
                            : colors.inputBorder
                        }
                        placeholderTextStyle={{
                          backgroundColor: colors.boxBackground,
                          color: errors.identifier
                            ? colors.errorAlert
                            : colors.textSecondary,
                        }}
                        right={
                          <TouchableOpacity style={styles.secureButton}>
                            <Image
                              source={CustomImages.mail}
                              style={styles.mailIcon}
                              tintColor={colors.textSecondary}
                            />
                          </TouchableOpacity>
                        }
                        containerStyle={{
                          backgroundColor: colors.boxBackground,
                        }}
                        backgroundColor={colors.boxBackground}
                        placeholderTextColor={colors.textSecondary}
                        ref={identifierRef}
                      />
                    )}
                  />
                  {errors.identifier && (
                    <ErrorText
                      visible={errors.identifier?.message}
                      message={errors.identifier?.message}
                    />
                  )}
                </View>
                <View>
                  <Controller
                    control={control}
                    name="password"
                    rules={{
                      required: 'Password is required',
                      minLength: {
                        value: 6,
                        message: 'Password must be at least 6 characters',
                      },
                    }}
                    render={({
                      field: {onChange, value},
                      fieldState: {isTouched},
                    }) => (
                      <AnimatedTextInput
                        placeholder="Password"
                        defaultValue={value}
                        onChangeText={onChange}
                        secureTextEntry={show}
                        onFocusPress={() => passwordRef?.current?.focus()}
                        borderColor={
                          errors.password
                            ? colors.errorAlert
                            : colors.inputBorder
                        }
                        containerStyle={{
                          backgroundColor: colors.boxBackground,
                        }}
                        placeholderTextStyle={{
                          backgroundColor: colors.boxBackground,
                          color: errors.password
                            ? colors.errorAlert
                            : colors.textSecondary,
                        }}
                        backgroundColor={colors.boxBackground}
                        placeholderTextColor={
                          errors.password
                            ? colors.errorAlert
                            : colors.textSecondary
                        }
                        ref={passwordRef}
                        right={
                          <TouchableOpacity
                            onPress={() => setShow(!show)}
                            style={styles.secureButton}>
                            <Image
                              source={
                                show
                                  ? CustomImages.eyeClose
                                  : CustomImages.eyeOpen
                              }
                              style={styles.eyeStyle}
                              tintColor={colors.textSecondary}
                            />
                          </TouchableOpacity>
                        }
                      />
                    )}
                  />
                  {errors.password && (
                    <ErrorText
                      visible={errors.password?.message}
                      message={errors.password?.message}
                    />
                  )}
                </View>
              </View>
              <CustomButton
                title="Login"
                btnStyle={styles.button}
                onPress={handleSubmit(onSubmit)}
                showIcon
              />

              <View style={styles.signupContainer}>
                <Text style={styles.note}>
                  Don’t have an account?{' '}
                  <Text
                    style={styles.textbtn}
                    onPress={() => navigation.navigate('Signup')}>
                    Sign up
                  </Text>
                </Text>
              </View>
            </View>
          </CardWrapper>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    rowGap: 16,
  },
  mailIcon: {
    width: 18,
    height: 18,
  },
  secureButton: {
    marginRight: 10,
  },
  eyeStyle: {
    width: 22,
    height: 22,
  },
  innerContent: {
    // justifyContent: 'center',
    // marginTop: 70,
  },
  subtext: {
    fontFamily: Fonts.inter400,
    color: colors.textSecondary,
  },
  subtitle: {
    fontFamily: Fonts.poppins600,
    fontSize: 18,
    lineHeight: 20,
    color: colors.gradientstartColor,
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    // paddingBottom: 16,
  },
  logoBox: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 14,
  },
  logo: {
    width: 250,
    height: 250,
  },
  scrollView: {
    flex: 1,
  },
  button: {
    marginTop: 16,
  },
  textbtn: {
    fontFamily: Fonts.inter500,
    color: colors.gradientendColor,
  },
  note: {
    fontFamily: Fonts.inter400,
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    // paddingBottom: 12,
    paddingVertical: 40,
  },
  signupContainer: {
    marginTop: 10,
    alignItems: 'center',
  },
  errorText: {
    color: colors.errorAlert,
    fontFamily: Fonts.inter400,
    fontSize: 12,
    marginTop: 4,
  },
});

export default React.memo(LoginScreen);
