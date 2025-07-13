import React, {useCallback} from 'react';
import {View, Text, StyleSheet, StatusBar} from 'react-native';
import {colors} from '../../constants/colors';
import {Fonts} from '../../assets/fonts/Customfont';
import LinearGradient from 'react-native-linear-gradient';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useFocusEffect} from '@react-navigation/native';

interface ProgressIndicatorProps {
  isPageOneComplete: boolean;
  isPageTwoComplete: boolean;
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  isPageOneComplete,
  isPageTwoComplete,
}) => {
  const {top} = useSafeAreaInsets();
  useFocusEffect(
    useCallback(() => {
      StatusBar.setBarStyle('light-content');
      StatusBar.setTranslucent(true);
      StatusBar.setBackgroundColor('transparent');
    }, []),
  );
  return (
    <LinearGradient
      colors={[colors.gradientstartColor, colors.gradientendColor]} // Gradient from purple to pink
      start={{x: 0, y: 0}} // Gradient starts from the left
      end={{x: 1, y: 0}} // Gradient ends on the right
      style={[styles.gradient, {paddingTop: StatusBar.currentHeight}]}>
      <StatusBar translucent backgroundColor={'transparent'} />
      <View style={[styles.container, {paddingTop: top}]}>
        {/* Page 1 */}
        <View style={styles.stepContainer}>
          <View
            style={[styles.circle, isPageOneComplete && styles.circleComplete]}>
            <Text
              style={[
                styles.circleText,
                isPageOneComplete && styles.circleTextComplete,
              ]}>
              {isPageOneComplete ? '✔' : '1'}
            </Text>
          </View>
        </View>

        {/* Connecting Line */}
        <View style={[styles.line, isPageOneComplete && styles.lineComplete]} />

        {/* Page 2 */}
        <View style={styles.stepContainer}>
          <View
            style={[styles.circle, isPageTwoComplete && styles.circleComplete]}>
            <Text
              style={[
                styles.circleText,
                isPageTwoComplete && styles.circleTextComplete,
              ]}>
              {isPageTwoComplete ? '✔' : '2'}
            </Text>
          </View>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {},
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    width: '50%',
    alignSelf: 'center',
  },
  stepContainer: {
    alignItems: 'center',
  },
  circle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: colors.trustBase,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  circleComplete: {
    backgroundColor: 'green',
  },
  circleText: {
    fontFamily: Fonts.inter700,
    fontSize: 16,
    color: colors.gradientstartColor,
  },
  circleTextComplete: {
    color: colors.white,
  },
  line: {
    flex: 1,
    height: 2,
    backgroundColor: colors.trustBase,
    marginHorizontal: 10,
  },
  lineComplete: {
    backgroundColor: 'green',
  },
  label: {
    fontFamily: Fonts.inter400,
    fontSize: 12,
    color: colors.textSecondary,
  },
});

export default ProgressIndicator;
