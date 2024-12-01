import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from './src/screens/Splash';
import LoginScreen from './src/screens/Login';
import SignUpScreen from './src/screens/SignUp';
import Onboarding from './src/screens/Onboarding';
import HomeScreen from './src/screens/HomeScreen';
import JobDetails from './src/screens/JobDetails';
import ApplyScreen from './src/screens/ApplyScreen';
import HeaderComponentHomeScreen from './src/components/HeaderComponentHomeScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash" headerMode="screen" >
        <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="SignUp" component={SignUpScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Onboarding" component={Onboarding} options={{ headerShown: false }}/>
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
       <Stack.Screen name="JobDetails" component={JobDetails} options={{ headerShown: false }} />
       <Stack.Screen name="ApplyScreen" component={ApplyScreen} options={{ headerShown: false }} />
     
      </Stack.Navigator>
    </NavigationContainer>
  );
}
