import { View, Text, SafeAreaView } from "react-native";
import React, { useCallback, useState } from "react";
import { ScrollView, GestureHandlerRootView } from "react-native-gesture-handler"; // Add GestureHandlerRootView
import { MyJobs, PopularJobs, Search,Welcome, Navbar } from "../components";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { SIZES } from "../constants";
import { Stack } from "expo-router";
import { useRouter } from "expo-router";

 SplashScreen.preventAutoHideAsync();

export default function Home() {
  const [searchTerm,setSearchTerm] = useState("");
  const router = useRouter();
  const [fontsLoaded] = useFonts({
    DMBold: require('../assets/fonts/DMSans-Bold.ttf'),
    DMMedium: require('../assets/fonts/DMSans-Medium.ttf'),
    DMRegular: require('../assets/fonts/DMSans-Regular.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}> {/* Add this */}
      <SafeAreaView
        style={{ flex: 1, backgroundColor: "#eee" }}
        onLayout={onLayoutRootView}
      >
        
        <Stack.Screen options={{ headerShown: false }} />
        
        <ScrollView showsHorizontalScrollIndicator={false}>
          <View style={{ flex: 1, padding: SIZES.medium }}>
          <Welcome 
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            handleClick={() => {
              if (searchTerm) {
                router.push(`/search/${searchTerm}`)
              }
            }}
          />
            <MyJobs />
          </View>
        </ScrollView>
        <Navbar/>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}