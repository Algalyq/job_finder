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
import SearchScreen from './src/screens/SearchScreen';
import SpecializationPage from './src/screens/SpecializationPage';
import HeaderComponentHomeScreen from './src/components/HeaderComponentHomeScreen';
import FilterScreen from './src/screens/JobFilter';
import NoResultsScreen from './src/screens/NoResultsScreen';
import AddJobPage from './src/screens/AddJobPage';
import JobPost from './src/screens/JobPost';
import SavedJobsPage from './src/screens/SavedJobs';
import ProfileScreen from './src/screens/ProfilePage';
import AboutMeScreen from './src/screens/AboutMePage';
import AddWorkExperienceScreen from './src/screens/AddWorkExperiencePage';
import AddEducationScreen from './src/screens/AddEducationPage';
import SkillSelectionScreen from './src/screens/AddSkillPage';
import AddResumeScreen from './src/screens/AddResumeScreen';
import SearchModal from './src/components/SearchModal';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" headerMode="screen" >
        <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="SignUp" component={SignUpScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Onboarding" component={Onboarding} options={{ headerShown: false }}/>
        <Stack.Screen name="Search" component={SearchScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="SpecializationPage" component={SpecializationPage} options={{ headerShown: false }}/>
        <Stack.Screen name="FilterScreen" component={FilterScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="NoResultsScreen" component={NoResultsScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="AddJobPage" component={AddJobPage} options={{ headerShown: false }}/>
        <Stack.Screen name="JobPost" component={JobPost} options={{ headerShown: false }}/>
        <Stack.Screen name="SavedJobs" component={SavedJobsPage} options={{ headerShown: false }}/>
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="AboutMeScreen" component={AboutMeScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="AddEducationScreen" component={AddEducationScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="AddWorkExperienceScreen" component={AddWorkExperienceScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="SkillSelectionScreen" component={SkillSelectionScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="AddResumeScreen" component={AddResumeScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="SearchModal" component={SearchModal} options={{ headerShown: false }}/>
      
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
