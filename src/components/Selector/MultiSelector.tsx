import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  TextStyle,
  Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Fonts} from '../../assets/fonts/Customfont';
import {colors} from '../../constants/colors';

type MultiSelectorProps = {
  options: string[];
  value?: string;
  onChange: (value: string) => void;
  style?: ViewStyle;
  optionStyle?: ViewStyle;
  optionTextStyle?: TextStyle;
  question?: string;
  questionIcon?: React.ReactNode;
  label?: string;
};

const MultiSelector: React.FC<MultiSelectorProps> = ({
  options,
  value,
  onChange,
  style,
  optionStyle,
  label,
  optionTextStyle,
  question,
  questionIcon,
}) => {
  const [pressedIdx, setPressedIdx] = useState<number | null>(null);

  return (
    <View style={[styles.mainContainer, style]}>
      {(question || questionIcon || label) && (
        <View style={styles.header}>
          {questionIcon && (
            <Image
              source={questionIcon}
              style={styles.icon}
              resizeMode="contain"
            />
          )}
          {question && <Text style={styles.question}>{question}</Text>}
          {label && <Text style={styles.label}>{label}</Text>}
        </View>
      )}
      <View style={styles.container}>
        {options.map((option, idx) => {
          const selected = value === option;
          const pressed = pressedIdx === idx;

          return (
            <View key={option} style={[styles.optionWrapper, optionStyle]}>
              <LinearGradient
                colors={
                  selected
                    ? ['#8C5AFF', '#F0557C']
                    : pressed
                    ? ['#F6F3FF', '#F6F3FF']
                    : ['#fff', '#fff']
                }
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                style={[
                  styles.option,
                  selected ? styles.selectedOption : styles.unselectedOption,
                  pressed && styles.pressedOption,
                ]}>
                <TouchableOpacity
                  style={styles.touchOverlay}
                  onPress={() => onChange(option)}
                  activeOpacity={0.7}
                  onPressIn={() => setPressedIdx(idx)}
                  onPressOut={() => setPressedIdx(null)}>
                  <Text
                    style={[
                      styles.optionText,
                      selected
                        ? styles.selectedText
                        : pressed
                        ? styles.pressedText
                        : styles.unselectedText,
                      optionTextStyle,
                    ]}>
                    {option}
                  </Text>
                </TouchableOpacity>
              </LinearGradient>
              {selected && (
                <View style={styles.tickCircle}>
                  <Icon name="check" color="#fff" size={14} />
                </View>
              )}
            </View>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    marginVertical: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    marginLeft: 4,
    columnGap: 7,
  },
  icon: {
    // marginRight: 6,
    // marginTop: 2,
    width: 18,
    height: 18,
  },
  question: {
    fontFamily: Fonts.DMSans700,
    fontSize: 18,
    color: colors.textPrimary,
  },
  label: {
    fontSize: 16,
    fontFamily: Fonts.inter500,
    color: colors.textPrimary,
  },
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
    marginTop: 8,
  },
  optionWrapper: {
    position: 'relative',
    // minWidth: 130,
    minHeight: 42,
    margin: 2,
    width: 'auto',
  },
  option: {
    flexDirection: 'column',
    alignItems: 'center',
    // minWidth: 130,
    // minHeight: 42,
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 22,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 3,
    shadowOffset: {width: 0, height: 2},
    elevation: 1,
    justifyContent: 'center',
  },
  selectedOption: {
    borderColor: 'transparent',
  },
  unselectedOption: {
    borderColor: '#E1E1E1',
  },
  pressedOption: {
    borderColor: '#8C5AFF',
  },
  optionText: {
    fontSize: 14,
    fontFamily: Fonts.inter400,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 18,
  },
  selectedText: {
    color: '#fff',
  },
  unselectedText: {
    color: '#222',
  },
  pressedText: {
    color: '#8C5AFF',
  },
  touchOverlay: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    // minHeight: 42,
    justifyContent: 'center',
  },
  tickCircle: {
    position: 'absolute',
    top: -8,
    right: 0,
    backgroundColor: '#38D97A',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fff',
    zIndex: 1,
  },
});

export default MultiSelector;
