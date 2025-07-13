import React, {useEffect} from 'react';
import RootScreen from './src/navigation/RootScreen';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import SplashScreen from 'react-native-splash-screen';
// import * as SplashScreen from 'expo-splash-screen';

// Create a client
const queryClient = new QueryClient();

const App: React.FC = () => {
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 2000);
  }, []);
  return (
    <GestureHandlerRootView>
      <QueryClientProvider client={queryClient}>
        <RootScreen />
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
};

export default App;
