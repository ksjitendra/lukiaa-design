import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';
import {SkintoneOption} from '../../types/outfitDataType';
import {Fonts} from '../../assets/fonts/Customfont';
import {colors} from '../../constants/colors';

type SkintoneSelectorProps = {
  options: SkintoneOption[];
  selected?: SkintoneOption | '';
  onChange: (value: SkintoneOption) => void;
  style?: ViewStyle;
  optionStyle?: ViewStyle;
  optionTextStyle?: TextStyle;
  label?: string;
};

const CIRCLE_SIZE = 40;
const BORDER_WIDTH = 3;
const GAP_SIZE = 4;

const SkintoneSelector: React.FC<SkintoneSelectorProps> = ({
  options,
  selected,
  onChange,
  style,
}) => {
  return (
    <View>
      <Text style={styles.label}>What's your skin tone?</Text>
      <Text style={styles.subTitle}>
        choose the shade that best matches your skin
      </Text>
      <View style={[styles.mainContainer, style]}>
        {options.map(option => {
          const selectedValue = selected && selected.value === option.value;
          return (
            <TouchableOpacity
              key={option.value}
              onPress={() => onChange(option)}
              activeOpacity={1}
              style={[
                styles.outerCircle,
                selectedValue && styles.selectedRing,
              ]}>
              <View
                style={[styles.innerCircle, {backgroundColor: option.color}]}
              />
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
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

  outerCircle: {
    width: CIRCLE_SIZE + GAP_SIZE * 2 + BORDER_WIDTH * 2,
    height: CIRCLE_SIZE + GAP_SIZE * 2 + BORDER_WIDTH * 2,
    borderRadius: (CIRCLE_SIZE + GAP_SIZE * 2 + BORDER_WIDTH * 2) / 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
    marginBottom: 8,
  },
  selectedRing: {
    borderWidth: BORDER_WIDTH,
    borderColor: '#000', // you can also use '#fff' or theme-based
  },
  innerCircle: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
  },
});

export default SkintoneSelector;
