import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';
import {SkinundertoneOption} from '../../types/outfitDataType';
import {Fonts} from '../../assets/fonts/Customfont';
import {colors} from '../../constants/colors';
import LinearGradient from 'react-native-linear-gradient';

type SkintoneSelectorProps = {
  options: SkinundertoneOption[];
  selected?: SkinundertoneOption | '';
  onChange: (value: SkinundertoneOption) => void;
  style?: ViewStyle;
  optionStyle?: ViewStyle;
  optionTextStyle?: TextStyle;
  label?: string;
};

const SkinundertoneSelector: React.FC<SkintoneSelectorProps> = ({
  options,
  selected,
  onChange,
  style,
  optionStyle,
  optionTextStyle,
}) => {
  const renderOption = (option: SkinundertoneOption) => {
    const isSelected = selected !== '' && selected?.id === option.id;

    const content = (
      <TouchableOpacity
        style={[styles.card, isSelected && styles.cardSelected]}
        activeOpacity={0.8}
        onPress={() => onChange(option)}
      >
        <View style={styles.radioContainer}>
          {isSelected ? (
            <View style={styles.radioGradientRing}>
              <LinearGradient
                colors={[colors.gradientstartColor, colors.gradientendColor]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.radioGradient}
              >
                <View style={styles.radioInner}>
                  {/* <View style={styles.radioInnerSelected} /> */}
                  <LinearGradient colors={[colors.gradientstartColor, colors.gradientendColor]}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 1}} style={styles.radioInnerSelected} />
                </View>
              </LinearGradient>
            </View>
          ) : (
            <View style={styles.radio} />
          )}
        </View>
        <View>
          <Text style={[styles.optionLabel, optionTextStyle]}>
            {option.title}
          </Text>
          <Text style={styles.optionDescription}>
            {option.subtitle}
          </Text>
        </View>
      </TouchableOpacity>
    );

    if (isSelected) {
      return (
        <LinearGradient
          key={option.id}
          colors={[colors.gradientstartColor, colors.gradientendColor]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[styles.gradientWrapper, styles.gradientWrapperSelected, optionStyle]}
        >
          <View style={styles.cardInner}>
            {content}
          </View>
        </LinearGradient>
      );
    }

    return (
      <View
        key={option.id}
        style={[styles.gradientWrapper, optionStyle]}
      >
        <View style={styles.cardInner}>
          {content}
        </View>
      </View>
    );
  };

  return (
    <View>
      <Text style={styles.label}>What's your skin undertone?</Text>
      <Text style={styles.subTitle}>this affects which colors look</Text>
      <View style={style}>
        {options.map(renderOption)}
      </View>
    </View>
  );
};

const gradientBorderWidth = 2;

const styles = StyleSheet.create({
  gradientWrapper: {
    borderRadius: 12,
    padding: gradientBorderWidth,
    marginBottom: 12,
    backgroundColor: colors.border,
  },
  gradientWrapperSelected: {
    borderRadius: 12 + gradientBorderWidth,
  },
  cardInner: {
    backgroundColor: colors.background,
    borderRadius: 12, // Slightly less than wrapper to show the border
    overflow: 'hidden',
  },
  mainOption: {
    height: 50,
    width: 50,
    borderWidth: 5,
    padding: 30,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
    marginBottom: 20,
  },

  label: {
    marginBottom: 6,
    fontSize: 16,
    fontFamily: Fonts.inter500,
    color: colors.textPrimary,
  },
  subTitle: {
    fontFamily: Fonts.inter400,
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 12,
  },

  card: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    padding: 16,
    backgroundColor: 'transparent',
    gap: 12,
    minHeight: 60, // Ensure consistent height
  },
  cardSelected: {
    backgroundColor: colors.backgroundLight, // slightly tinted if available
  },
  radioContainer: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 4,
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.textSecondary,
  },
  radioGradientRing: {
    width: 24,
    height: 24,
    borderRadius: 12,
    padding: 2,
    backgroundColor: colors.background,
  },
  radioGradient: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
    padding: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioInner: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioInnerSelected: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.primary,
  },
  optionLabel: {
    fontSize: 15,
    fontFamily: Fonts.inter500,
    color: colors.textPrimary,
    marginBottom: 4,
  },
  optionDescription: {
    fontSize: 13,
    fontFamily: Fonts.inter400,
    color: colors.textSecondary,
  },
});

export default SkinundertoneSelector;
