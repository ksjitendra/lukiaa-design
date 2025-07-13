import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';
import Slider from '@react-native-community/slider';
import {colors} from '../../constants/colors';
import {Fonts} from '../../assets/fonts/Customfont';

// Define the interface for the component props
interface HeightSliderProps {
  minHeight?: number; // Minimum height in inches
  maxHeight?: number; // Maximum height in inches
  defaultHeight?: number; // Default height in inches
  title?: string; // Title text
  description?: string; // Description text
  containerStyle?: StyleProp<ViewStyle>; // Custom style for the container
  titleStyle?: StyleProp<TextStyle>; // Custom style for the title
  descriptionStyle?: StyleProp<TextStyle>; // Custom style for the description
  heightValueStyle?: StyleProp<TextStyle>; // Custom style for the height value text
  sliderStyle?: StyleProp<ViewStyle>; // Custom style for the slider
  minimumTrackTintColor?: string; // Color for the minimum track
  maximumTrackTintColor?: string; // Color for the maximum track
  thumbTintColor?: string; // Color for the slider thumb
  onHeightChange?: (height: number) => void; // Callback for height change
}

// Function to convert inches to feet and inches (e.g., 70 inches -> 5'10")
const inchesToFeet = (inches: number): string => {
  const feet = Math.floor(inches / 12);
  const remainingInches = inches % 12;
  return `${feet}'${remainingInches}"`;
};

// Function to convert inches to centimeters
const inchesToCm = (inches: number): number => {
  return Math.round(inches * 2.54);
};

// Define the HeightSlider component with typed props
const HeightSlider: React.FC<HeightSliderProps> = ({
  minHeight = 59, // Default: 4'11" in inches
  maxHeight = 79, // Default: 6'7" in inches
  defaultHeight = 70, // Default: 5'10" in inches
  title = 'Height',
  description = 'Slide to select your height',
  containerStyle = {},
  titleStyle = {},
  descriptionStyle = {},
  heightValueStyle = {},
  sliderStyle = {},
  minimumTrackTintColor = '#6B7280',
  maximumTrackTintColor = '#D1D5DB',
  thumbTintColor = '#8B5CF6',
  onHeightChange = () => {},
}) => {
  const [heightInInches, setHeightInInches] = useState<number>(defaultHeight);

  const handleValueChange = (value: number) => {
    setHeightInInches(value);
    onHeightChange(value); // Callback to pass the selected height to parent component
  };

  useEffect(() => {
    handleValueChange(defaultHeight);
  }, [defaultHeight]);

  return (
    <View style={[styles.section, containerStyle]}>
      <Text style={[styles.title, titleStyle]}>{title}</Text>
      <Text style={[styles.description, descriptionStyle]}>{description}</Text>
      <View style={styles.heightBox}>
        <View style={styles.heightValueContainer}>
          <Text style={[styles.heightValue, heightValueStyle]}>
            {inchesToFeet(heightInInches)} ({inchesToCm(heightInInches)} cm)
          </Text>
        </View>
        <Slider
          style={[styles.slider, sliderStyle]}
          minimumValue={minHeight}
          maximumValue={maxHeight}
          step={1}
          value={heightInInches}
          onValueChange={handleValueChange}
          minimumTrackTintColor={minimumTrackTintColor}
          maximumTrackTintColor={maximumTrackTintColor}
          thumbTintColor={thumbTintColor}
        />
      </View>
    </View>
  );
};

// Define styles using StyleSheet
const styles = StyleSheet.create({
  heightBox: {
    backgroundColor: '#d0e2ff',
    borderRadius: 14,
    padding: 10,
    paddingHorizontal: 10,
  },
  section: {
    borderRadius: 10,
    marginVertical: 10,
  },
  title: {
    fontSize: 16,
    fontFamily: Fonts.inter500,
    color: colors.textPrimary,
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    fontFamily: Fonts.inter400,
    color: colors.textSecondary,
    marginBottom: 10,
  },
  heightValueContainer: {
    alignItems: 'center',
    marginBottom: 15,
  },
  heightValue: {
    fontSize: 16,
    fontFamily: Fonts.inter500,
    color: colors.textPrimary,
  },
  slider: {
    width: '100%',
    height: 40,
  },
});

export default HeightSlider;
