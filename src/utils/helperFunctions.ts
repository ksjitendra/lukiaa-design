import {Platform} from 'react-native';

export const isAndroid = Platform.OS == 'android';

// Add helper function
export const cmToInches = (cm: number): number => Math.round(cm / 2.54);

export const inchesToCm = inches => {
  if (typeof inches !== 'number' || isNaN(inches) || inches < 0) {
    return 0; // or handle invalid input as needed
  }
  return String(Math.round(inches * 2.54)); // 1 inch = 2.54 cm, rounded to nearest integer
};

export const keyExtractor = (item: any, index: number) =>
  item?.id || index.toString();
