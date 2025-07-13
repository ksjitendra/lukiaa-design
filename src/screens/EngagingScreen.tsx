import React, {useRef, useState} from 'react';
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Text,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
  StatusBar,
} from 'react-native';
import CardWrapper from '../common/CardWrapper';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import CustomButton from '../common/CustumButton';
import {colors} from '../constants/colors';
import {useCommonStyles} from '../common/CommonStyle';
import {Fonts} from '../assets/fonts/Customfont';
import LinearGradient from 'react-native-linear-gradient';
import {CustomImages} from '../assets/images';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/rootReducer';
import {useFocusEffect} from '@react-navigation/native';
import {EngagementShown} from '../redux/slice/userProfile';
import {useDispatch} from 'react-redux';

const EngagingScreen: React.FC = ({navigation}) => {
  const {title, subText} = useCommonStyles();
  const {token, username} = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  useFocusEffect(
    React.useCallback(() => {
      dispatch(EngagementShown());
    }, [dispatch]),
  );

  const handleNextNav = () => {
    navigation.navigate('BottomTab');
  };

  const {top, bottom} = useSafeAreaInsets();

  return (
    <LinearGradient
      colors={['#d8e7fe', colors.white]}
      start={{x: 1, y: 1}} // Start at bottom-right
      end={{x: 0, y: 0}} // End at top-left
      style={styles.gradient}>
      <StatusBar backgroundColor={colors.white} barStyle="dark-content" />
      <View
        style={[
          styles.outterContainer,
          {marginTop: top, marginBottom: bottom + 20},
        ]}>
        <ScrollView
          style={[styles.scrollView]}
          contentContainerStyle={{flexGrow: 1}}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled">
          <View style={[styles.innerContent, {marginBottom: bottom}]}>
            <View style={styles.topPart}>
              <View style={styles.header}>
                <Text style={[title, styles.title]}>Lukiaa</Text>
              </View>
              <View style={{flex: 1, justifyContent: 'space-around'}}>
                <View style={styles.commonContainer}>
                  <View style={[styles.otpcontent]}>
                    <View style={styles.secTitleBox}>
                      <Text style={[title, styles.title, styles.secTitle]}>
                        Hey there, I'm Lukiaa
                      </Text>
                    </View>

                    <Text style={styles.subtitle}>
                      <Text style={{fontSize: 25}}>Y</Text>our personal AI
                      stylist - I'm here to help you look and feel your best
                      every day.{' '}
                    </Text>
                  </View>
                  <Image
                    source={CustomImages.logo}
                    style={styles.sideChar}
                    resizeMode="cover"
                  />
                </View>
                <Text style={styles.thirdTitle}>
                  To style you best, I just need a few quicks details about your
                  look and perfrences.
                </Text>
                <View>
                  <View style={styles.whiteBox}>
                    <Image source={CustomImages.flash} style={styles.icon} />
                    <Text style={[subText, styles.whiteBoxText]}>
                      It takes less then a minute - and your style journey
                      begins!
                    </Text>
                  </View>
                  <View style={styles.whiteBox}>
                    <Image source={CustomImages.target} style={styles.icon} />
                    <Text style={[subText, styles.whiteBoxText]}>
                      To style you best, I just need a few quicks details about
                      your look and perfrences.
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
        <CustomButton
          title="Start Your Style Journey"
          btnStyle={styles.button}
          onPress={handleNextNav}
        />
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  outterContainer: {
    flex: 1,
    paddingHorizontal: 24,
  },
  commonContainer: {
    flexDirection: 'row',
  },
  sideChar: {
    height: 300,
    width: 150,
  },
  thirdTitle: {
    fontSize: 16,
    lineHeight: 20,
    color: colors.textSecondary,
    fontFamily: Fonts.inter500,
    marginVertical: 16,
  },
  secTitleBox: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  waveStyle: {
    width: 30,
    height: 30,
  },
  secTitle: {
    color: colors.black,
    marginBottom: 10,
    marginTop: 16,
  },
  whiteBoxText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 16,
    color: colors.textSecondary,
    fontFamily: Fonts.inter400,
  },
  icon: {
    width: 25,
    height: 25,
  },
  whiteBox: {
    backgroundColor: colors.white,
    borderRadius: 14,
    padding: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 10,
    marginVertical: 12,
  },
  gradient: {
    flex: 1,
  },
  topPart: {
    flex: 1,
  },
  subtitle: {
    fontFamily: Fonts.inter700,
    fontSize: 20,
    // marginVertical: 16,
    // marginTop: 20,
    color: colors.gradientendColor,
  },
  otpcontent: {
    flex: 1,
    justifyContent: 'center',
    marginTop: 20,
  },
  header: {
    marginTop: 40,
  },
  button: {
    marginTop: 16,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  innerContent: {
    justifyContent: 'center',
    flex: 1,
  },
  container: {
    flex: 1,
    paddingTop: 100,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    color: colors.titleColor,
    fontSize: 30,
    lineHeight: 34,
    textAlign: 'left',
    marginBottom: 0,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
    height: 70,
  },
  inputBox: {
    width: 40,
    height: 40,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: colors.gradientstartColor,
    fontSize: 14,
    lineHeight: 14,
    textAlign: 'center',
  },
});

export default EngagingScreen;
