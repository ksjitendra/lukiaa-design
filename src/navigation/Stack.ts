import {NavigationProp, RouteProp} from '@react-navigation/native';
import {AuthParams} from './AuthStack';
import {MainStackParams} from './MainStack';
import {BottomTabParams} from './BottomStack';

export type ScreenParams = AuthParams & MainStackParams & BottomTabParams; // Combine the params

export type ScreenProps<T extends keyof ScreenParams> = {
  navigation: NavigationProp<ScreenParams, T>;
  route: RouteProp<ScreenParams, T>;
};
