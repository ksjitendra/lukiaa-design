import {StatusBar, StyleSheet, View} from 'react-native';
import React from 'react';
import {AuthStack} from './AuthStack';
import {colors} from '../constants/colors';
import AppLoader, {LoaderType} from '../common/AppLoader';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/rootReducer';
import {MainStack} from './MainStack';
import CustomToastWrapper from '../components/toaster/ToastProviderWrapper';

export const AppLoaderRef = React.createRef<LoaderType>();
const RootScreen: React.FC = () => {
  const {isAuthenticated} = useSelector((state: RootState) => state.auth);
  const {isProfileSetup} = useSelector((state: RootState) => state.userProfile);
  return (
    <CustomToastWrapper>
      <View style={styles.container}>
        <StatusBar backgroundColor={colors.accent} barStyle="dark-content" />
        {isAuthenticated && isProfileSetup ? <MainStack /> : <AuthStack />}
        <AppLoader ref={AppLoaderRef} />
      </View>
    </CustomToastWrapper>
  );
};

export default RootScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
