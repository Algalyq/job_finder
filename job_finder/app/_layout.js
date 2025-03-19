import { Stack, useRouter, useSegments } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback, useEffect, useState } from 'react';
import { useFonts } from 'expo-font';
import { View, ActivityIndicator } from 'react-native';
import { isAuthenticated, getAuthTokens, clearAuthTokens } from '../utils/auth';
import { COLORS } from '../constants';

// Prevent auto-hiding of splash screen
SplashScreen.preventAutoHideAsync();

// Define protected routes
const protectedRoutes = [
  'profile',
  'messages',
  'saved-jobs',
  'job-details',
  'search',
  '(tabs)',
];

const Layout = () => {
  const [fontsLoaded] = useFonts({
    DMBold: require('../assets/fonts/DMSans-Bold.ttf'),
    DMMedium: require('../assets/fonts/DMSans-Medium.ttf'),
    DMRegular: require('../assets/fonts/DMSans-Regular.ttf'),
  });

  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);
  const segments = useSegments();
  const router = useRouter();
  useEffect(() => {
    const initializeApp = async () => {
      try {
        console.log('Initializing app...');
        const { access, refresh } = await getAuthTokens();
        
        if (!access || !refresh) {
          console.log('No tokens found, redirecting to login...');
          await clearAuthTokens();
          setIsUserAuthenticated(false);
          setAuthChecked(true);
          return;
        }

        // Set authenticated state if we have tokens
        setIsUserAuthenticated(true);
        setAuthChecked(true);
      } catch (error) {
        console.error('Error during app initialization:', error);
        await clearAuthTokens();
        setIsUserAuthenticated(false);
      } finally {
        setAuthChecked(true);
      }
    };

    initializeApp();
  }, [router]);

  useEffect(() => {
    if (!authChecked) return;

    const segment = segments[0] || '';
    const inAuthGroup = segment === 'auth';
    const isProtectedRoute = !inAuthGroup && protectedRoutes.some(route => segment.startsWith(route));

    if (!isUserAuthenticated && isProtectedRoute) {
      console.log('Unauthorized access attempt, redirecting to login...');
      router.replace('/auth/login');
    } else if (isUserAuthenticated && inAuthGroup) {
      console.log('Authenticated user accessing auth route, redirecting...');
      router.replace('/');
    }
  }, [isUserAuthenticated, segments, authChecked, router]);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded && authChecked) { // Add authChecked to ensure both are ready
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, authChecked]);

  if (!fontsLoaded || !authChecked) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.lightWhite }}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  return (
    <Stack
      onLayout={onLayoutRootView}
      screenOptions={{
        headerStyle: {
          backgroundColor: '#FAFAFC',
        },
        headerShadowVisible: false,
        headerLeft: () => null,
      }}
    >
      {/* Auth Group */}
      <Stack.Screen name="auth/login" options={{ headerShown: false }} />
      <Stack.Screen name="auth/register" options={{ headerShown: false }} />

      {/* Main Navigation */}
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

      {/* Profile Group */}
      <Stack.Screen name="profile/index" options={{ headerShown: false }} />
      <Stack.Screen name="profile/edit" options={{ headerShown: false }} />
      <Stack.Screen name="profile/about-me" options={{ headerShown: false }} />
      <Stack.Screen name="profile/add-work-experience" options={{ headerShown: false }} />
      <Stack.Screen name="profile/skill-section" options={{ headerShown: false }} />
      <Stack.Screen name="profile/add-education" options={{ headerShown: false }} />
      <Stack.Screen name="profile/add-resume" options={{ headerShown: false }} />

      {/* Job Related */}
      <Stack.Screen name="job-details/[id]" options={{ headerShown: false }} />
      <Stack.Screen name="search/[id]" options={{ headerShown: false }} />

      {/* Tab Screens */}
      <Stack.Screen name="saved-jobs/index" options={{ headerShown: false }} />
      <Stack.Screen name="messages/index" options={{ headerShown: false }} />
      <Stack.Screen name="messages/[id]" options={{ headerShown: false }} />
    </Stack>
  );
};

export default Layout;