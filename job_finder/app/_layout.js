import { Stack, useRouter, useSegments } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback, useEffect } from 'react';
import { useFonts } from 'expo-font';
import { View, ActivityIndicator } from 'react-native';
import { COLORS } from '../constants';
import { AuthProvider, useAuth } from '../context/AuthContext';

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

const LayoutInner = () => {
  const [fontsLoaded] = useFonts({
    DMBold: require('../assets/fonts/DMSans-Bold.ttf'),
    DMMedium: require('../assets/fonts/DMSans-Medium.ttf'),
    DMRegular: require('../assets/fonts/DMSans-Regular.ttf'),
  });

  const { isLoggedIn } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    const segment = segments[0] || '';
    const inAuthGroup = segment === 'auth';
    const isProtectedRoute = !inAuthGroup && protectedRoutes.some(route => segment.startsWith(route));

    if (!isLoggedIn && isProtectedRoute) {
      console.log('Unauthorized access attempt, redirecting to login...');
      router.replace('/auth/login');
    } else if (isLoggedIn && inAuthGroup) {
      console.log('Authenticated user accessing auth route, redirecting...');
      // router.replace('/');
    }
  }, [isLoggedIn, segments, router]);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
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

const Layout = () => {
  return (
    <AuthProvider>
      <LayoutInner />
    </AuthProvider>
  );
};

export default Layout;