import React from 'react';
import { SafeAreaView, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Onboarding_img from '../../assets/onboarding_svg';
import Next_onboard from '../../assets/next_onboard';
import { useFonts, DMSans_400Regular, DMSans_700Bold } from '@expo-google-fonts/dm-sans';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation

const Onboarding = () => {
  const navigation = useNavigation(); // Hook to get the navigation prop

  let [fontsLoaded] = useFonts({
    DMSans_400Regular,
    DMSans_700Bold,
  });

  if (!fontsLoaded) {
    return null; // Render a fallback or loader until fonts are loaded
  }

  // Navigate to the login screen
  const handleNext = () => {
    navigation.navigate('Login');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View style={styles.title_div}>
          <Text style={styles.title}>Jobspot</Text>
        </View>
        <View style={styles.onboarding}>
          <Onboarding_img width={311} height={301} />
        </View>
        <View style={styles.header_container}>
          <Text style={styles.header}>
            Find your{' '}
            <Text style={styles.highlighted_text}>Dream Job</Text>{' '}
            Here!
          </Text>
          <Text style={styles.description_container}>
            Explore all the most exciting job roles based on your interest and study major.
          </Text>
          <View style={styles.next_onboard}>
            <TouchableOpacity onPress={handleNext}>
              <Next_onboard width={60} height={60} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  title_div: {
    position: 'absolute',
    top: -60,
    right: 36,
  },
  title: {
    fontFamily: 'DMSans_700Bold',
    fontSize: 18,
    fontWeight: 700,
    color: '#000',
  },
  onboarding: {
    top: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header_container: {
    position: 'relative',
    right: 64,
    top: 80,
    alignSelf: 'center',
    width: 220,
  },
  header: {
    fontFamily: 'DMSans_700Bold',
    fontSize: 40,
    textAlign: 'left',
    color: '#000',
  },
  highlighted_text: {
    color: '#FCA34D',
    textDecorationLine: 'underline',
  },
  description_container: {
    fontFamily: 'DMSans_400Regular',
    fontSize: 14,
    color: '#524B6B',
    marginTop: 16,
    width: 285,
    height: 48,
  },
  next_onboard: {
    alignSelf: 'flex-end',
    left: 120,
  },
});

export default Onboarding;
