import React, {
  forwardRef,
  useImperativeHandle,
  useState,
  useCallback,
} from 'react';
import {
  Modal,
  StyleSheet,
  View,
  ActivityIndicator,
  ViewStyle,
} from 'react-native';
import {colors} from '../constants/colors'; // Adjust path if needed
import LukiaLoadingScreen from '../screens/LukiaLoadingScreen';

// Define the type of functions exposed via ref
export interface LoaderType {
  start: (isOutfitSelectionAnimation?: boolean) => void;
  stop: () => void;
  isLoading: () => boolean;
}

interface CustomLoaderProps {
  backgroundColor?: string;
  loaderColor?: string;
  size?: number;
  overlayStyle?: ViewStyle;
}

const AppLoader = forwardRef<LoaderType, CustomLoaderProps>(
  (
    {
      backgroundColor = 'rgba(0, 0, 0, 0.3)',
      loaderColor = colors.gradientstartColor,
      size = 70,
      overlayStyle,
    },
    ref,
  ) => {
    const [visible, setVisible] = useState<boolean>(false);
    const [isOutfitSelectionAnimation, setIsOutfitSelectionAnimation] =
      useState<boolean>(false);

    // Expose start/stop functions via ref
    useImperativeHandle(
      ref,
      () => ({
        start: (isOutfitSelectionAnimation: boolean = false) => {
          setIsOutfitSelectionAnimation(isOutfitSelectionAnimation);
          setVisible(true);
        },
        stop: () => setVisible(false),
        isLoading: () => visible,
      }),
      [visible],
    );

    return (
      <Modal
        visible={visible}
        transparent
        animationType="fade"
        statusBarTranslucent>
        <View
          style={[
            styles.overlay,
            {backgroundColor: backgroundColor},
            overlayStyle,
          ]}>
          {isOutfitSelectionAnimation ? (
            <LukiaLoadingScreen />
          ) : (
            <ActivityIndicator size="large" color={loaderColor} />
          )}
        </View>
      </Modal>
    );
  },
);

export default AppLoader;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
