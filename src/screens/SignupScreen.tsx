import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
  Image,
  TouchableOpacity,
} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import CustomButton from '../common/CustumButton';
import {Fonts} from '../assets/fonts/Customfont';
import CardWrapper from '../common/CardWrapper';
import {useCommonStyles} from '../common/CommonStyle';
import {colors} from '../constants/colors';
import {CustomImages} from '../assets/images';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import ErrorText from '../common/ErrorText';
import {useMutation} from '@tanstack/react-query';
import {SignupApi} from '../axios/PostApis';
import {
  emailValidation,
  nameValidation,
  passwordValidation,
} from '../utils/validation';
import {AppLoaderRef} from '../navigation/RootScreen';
import {CustomToaster} from '../components/toaster/CustomToaster';
import {ALERT_TYPE} from 'react-native-alert-notification';
import AnimatedTextInput from '../components/AnimatedTextInput';
import {ScreenProps} from '../navigation/Stack';

const SignupScreen: React.FC<ScreenProps<'Signup'>> = ({navigation}) => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const {title} = useCommonStyles();
  const {top, bottom} = useSafeAreaInsets();
  const [show, setShow] = useState(true);
  const {mutate} = useMutation({
    mutationFn: SignupApi,
    onMutate: () => {
      AppLoaderRef.current?.start();
    },
    onSuccess: data => {
      console.log('Signup Success:', data);
      CustomToaster({
        message: 'Signup Successfully!!!',
        type: ALERT_TYPE.SUCCESS,
      });
      navigation.navigate('AccountVerify', {
        userId: data?.data?.userId,
      });
    },
    onError: error => {
      console.error('Signup Error:', error);
      CustomToaster({
        message: error?.data?.message ?? 'Something went wrong',
        type: ALERT_TYPE.DANGER,
      });
    },
    onSettled: () => {
      AppLoaderRef.current?.stop();
    },
  });

  const onSubmit = data => {
    const payload = {
      nickName: data.name,
      email: data.email.toLowerCase(),
      password: data.password,
    };
    mutate(payload);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.keyboardAvoidingView}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          style={[styles.scrollView, {marginTop: top, marginBottom: bottom}]}
          contentContainerStyle={styles.contentStyle}
          keyboardShouldPersistTaps="handled">
          <View style={styles.innerContent}>
            <View style={styles.header}>
              <Text style={title}>Registeration</Text>
              <Image
                source={CustomImages.transparent_logo}
                style={styles.logo}
              />
            </View>
            <CardWrapper>
              <View style={styles.container}>
                <View style={styles.inputContainer}>
                  <View>
                    <Controller
                      control={control}
                      name="name"
                      rules={nameValidation}
                      render={({
                        field: {onChange, value},
                        fieldState: {isTouched},
                      }) => (
                        <AnimatedTextInput
                          placeholder="Full Name"
                          defaultValue={value}
                          onChangeText={onChange}
                          borderColor={
                            errors.name ? colors.errorAlert : colors.inputBorder
                          }
                          backgroundColor={colors.white}
                          isFocus={isTouched}
                          isValue={value?.length > 0}
                          right={
                            <TouchableOpacity style={styles.secureButton}>
                              <Image
                                source={CustomImages.contact}
                                style={styles.mailIcon}
                                tintColor={colors.textSecondary}
                              />
                            </TouchableOpacity>
                          }
                        />
                      )}
                    />
                    <ErrorText
                      visible={errors.name?.message}
                      message={errors.name?.message}
                    />
                  </View>
                  <View>
                    <Controller
                      control={control}
                      name="email"
                      rules={emailValidation}
                      render={({
                        field: {onChange, value},
                        fieldState: {isTouched},
                      }) => (
                        <AnimatedTextInput
                          placeholder="Email/Phone"
                          defaultValue={value}
                          onChangeText={text => onChange(text.toLowerCase())}
                          backgroundColor={colors.white}
                          isFocus={isTouched}
                          isValue={value?.length > 0}
                          right={
                            <TouchableOpacity style={styles.secureButton}>
                              <Image
                                source={CustomImages.mail}
                                style={styles.mailIcon}
                                tintColor={colors.textSecondary}
                              />
                            </TouchableOpacity>
                          }
                        />
                      )}
                    />
                    <ErrorText
                      visible={errors.email?.message}
                      message={errors.email?.message}
                    />
                  </View>
                  <View>
                    <Controller
                      control={control}
                      name="password"
                      rules={passwordValidation}
                      render={({
                        field: {onChange, value},
                        fieldState: {isTouched},
                      }) => (
                        <AnimatedTextInput
                          placeholder="Password"
                          defaultValue={value}
                          onChangeText={onChange}
                          secureTextEntry={show}
                          backgroundColor={colors.white}
                          isFocus={isTouched}
                          isValue={value?.length > 0}
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
                    <ErrorText
                      visible={errors.password?.message}
                      message={errors.password?.message}
                    />
                  </View>
                </View>
                <CustomButton
                  title="Sign Up"
                  btnStyle={styles.button}
                  onPress={handleSubmit(onSubmit)}
                />

                <View style={styles.signupContainer}>
                  <Text style={styles.note}>
                    Already have an account?{' '}
                    <Text
                      style={styles.textbtn}
                      onPress={() => navigation.navigate('Login')}>
                      Log In
                    </Text>
                  </Text>
                </View>
              </View>
            </CardWrapper>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
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
  inputContainer: {
    rowGap: 16,
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
    paddingBottom: 16,
  },
  innerContent: {},
  logoBox: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    paddingTop: 10,
  },
  logo: {
    width: 250,
    height: 250,
  },
  contentStyle: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  scrollView: {
    flex: 1,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    // paddingTop: 10,
    // paddingBottom: 10,
    paddingVertical: 40,
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
  signupContainer: {
    marginTop: 10,
    alignItems: 'center',
  },
});

export default SignupScreen;
