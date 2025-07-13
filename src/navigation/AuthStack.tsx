import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StyleSheet} from 'react-native';
import {colors} from '../constants/colors';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import AccountVerifyScreen from '../screens/AccountVerifyScreen';
import EngagingScreen from '../screens/EngagingScreen';
import ProfileScreenTwo from '../screens/ProfileScreenTwo';
import ProfileScreen from '../screens/ProfileScreen';

export type AuthParams = {
  Login: undefined;
  Signup: undefined;
  EngagingScreen: undefined;
  AccountVerify: {
    userId: number;
  };
  ProfileScreen: undefined;
  ProfileScreenTwo: {
    height: number | string;
    gender: string;
    age: string;
    bodyShape: string;
    bodyType: string[];
  };
};

const Stack = createNativeStackNavigator<AuthParams>();

export const AuthStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={() => ({
          contentStyle: styles.commonContentStyle,
          headerShown: false,
        })}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="AccountVerify" component={AccountVerifyScreen} />
        {/* <Stack.Screen name="EngagingScreen" component={EngagingScreen} /> */}
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
        <Stack.Screen name="ProfileScreenTwo" component={ProfileScreenTwo} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  commonContentStyle: {
    backgroundColor: colors.background,
  },
});
