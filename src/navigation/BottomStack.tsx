import {StyleSheet, Image, View} from 'react-native'; // Added View for debugging
import React, {useEffect} from 'react';
import {
  createBottomTabNavigator,
  BottomTabBarProps,
  BottomTabBar,
} from '@react-navigation/bottom-tabs';
import LinearGradient from 'react-native-linear-gradient';
import HomeTab from '../screens/tabs/HomeTab';
import DoubleIconHeader from '../components/header/DoubleIconHeader';
import {CustomImages} from '../assets/images';
import {colors} from '../constants/colors';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import ProfileTab from '../screens/tabs/ProfileTab';
import OutfitTab from '../screens/tabs/OutfitTab';
import ChatTab from '../screens/tabs/ChatTab';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/rootReducer';

export type BottomTabParams = {
  Home: undefined;
  Outfit: undefined;
  Profile: undefined;
  Chat: undefined;
};

const BottomTab = createBottomTabNavigator<BottomTabParams>();

// Custom Gradient Tab Bar with Safe Area and Custom Height
const GradientTabBar: React.FC<BottomTabBarProps> = props => {
  const insets = useSafeAreaInsets();
  const TAB_BAR_HEIGHT = 80;

  return (
    <View
      style={[
        styles.gradientTabBar,
        {
          minHeight: TAB_BAR_HEIGHT,
          paddingBottom: insets.bottom,
        },
      ]}>
      <LinearGradient
        colors={[colors.gradientstartColor, colors.gradientendColor]}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        style={StyleSheet.absoluteFill}>
        <BottomTabBar
          {...props}
          style={{
            backgroundColor: 'transparent',
            height: TAB_BAR_HEIGHT - insets.bottom, // Adjust for safe area
          }}
        />
      </LinearGradient>
    </View>
  );
};

const TabBarGradient = () => {
  return (
    <LinearGradient
      colors={[colors.gradientstartColor, colors.gradientendColor]}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}
      style={{flex: 1}}
    />
  );
};
// #73c3f9

const BottomTabNavigator = ({navigation}) => {
  const insets = useSafeAreaInsets();
  const {username} = useSelector((state: RootState) => state.auth);

  return (
    <BottomTab.Navigator
      tabBar={props => <GradientTabBar {...props} />}
      screenOptions={{
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: 'black',
        // tabBarBackground: () => <TabBarGradient />,
        tabBarStyle: {
          backgroundColor: 'transparent',
          borderTopWidth: 0,
          elevation: 0,
          paddingTop: 10,
        },
        // tabBarShowLabel: true,
        // Ensure header is visible and respects safe area
        headerStyle: {
          backgroundColor: colors.gradientstartColor, // Match gradient or set a solid color
          borderBottomWidth: 0,
          elevation: 0,
        },
        headerTitleStyle: {
          color: 'white', // Ensure header title is visible
        },
        // Add padding to content to avoid overlap with tab bar
        style: {
          paddingBottom: insets.bottom,
          paddingTop: insets.top,
        },
      }}>
      <BottomTab.Screen
        name="Home"
        component={HomeTab}
        options={{
          header: () => (
            <DoubleIconHeader
              leftIcon={CustomImages.letter_j}
              leftIconStyle={{width: 35, height: 35}}
              title={username ?? 'user name'}
              description="test"
            />
          ),
          tabBarIcon: ({focused, color, size}) => (
            <Image
              source={CustomImages.home}
              style={{
                width: size,
                height: size,
                tintColor: color,
              }}
            />
          ),
          // tabBarStyle: {paddingVertical: 12},
        }}
      />
      <BottomTab.Screen
        name="Outfit"
        component={OutfitTab}
        listeners={{
          tabPress: e => {
            e.preventDefault();
            navigation.navigate('OccasionScreen');
          },
        }}
        options={{
          header: () => (
            <DoubleIconHeader
              leftIcon={CustomImages.square}
              title="Outfit Tab"
            />
          ),
          tabBarIcon: ({focused, color, size}) => (
            <Image
              source={CustomImages.suit}
              style={{
                width: size,
                height: size,
                tintColor: color,
              }}
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="Profile"
        component={ProfileTab}
        options={{
          header: () => (
            <DoubleIconHeader
              leftIcon={CustomImages.leftArrow}
              title="Profile Tab"
            />
          ),
          tabBarIcon: ({focused, color, size}) => (
            <Image
              source={CustomImages.profile}
              style={{
                width: size,
                height: size,
                tintColor: color,
              }}
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="Chat"
        component={ChatTab}
        listeners={{
          tabPress: e => {
            e.preventDefault();
          },
        }}
        options={{
          header: () => (
            <DoubleIconHeader leftIcon={CustomImages.square} title="Chat Tab" />
          ),
          tabBarIcon: ({focused, color, size}) => (
            <Image
              source={CustomImages.chat}
              style={{
                width: size,
                height: size,
                tintColor: color,
              }}
            />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
};

const styles = StyleSheet.create({
  gradientTabBar: {
    minHeight: 100, // Match TAB_BAR_HEIGHT
  },
});

export default BottomTabNavigator;
