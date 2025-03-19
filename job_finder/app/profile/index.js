import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';
import useFetchProfile from '../../hook/useFetchProfile'; // Import custom hook
import styles from '../../styles/profile'; // Import styles
import { ProfileSections, Navbar } from "../../components"
import { images, COLORS } from '../../constants';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {router} from 'expo-router'

const ProfileScreen = () => {
  const { profile } = useFetchProfile(); 
  if (!profile) {
    return (
      <Text>
        <Text>Loading...</Text>
      </Text>
    );
  }

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('access');
      await AsyncStorage.removeItem('refresh');
      router.replace('auth/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <GestureHandlerRootView>
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scroll} contentContainerStyle={{ paddingBottom: 36 }}>
        <View style={styles.header}>
          <Image
            source={ profile.avatar ? { uri: profile.avatar } : images.profile }
            style={styles.picture}
          />
          <View style={styles.infoContainer}>
            <Text style={styles.title}>{profile.full_name|| 'Position'}</Text>
            <Text style={styles.name}>{profile.job_title || 'Name'}</Text>
          </View>

          <TouchableOpacity style={styles.headerButtons} onPress={handleLogout}>
            <Ionicons name="exit" size={28} color={COLORS.tertiary} />
        </TouchableOpacity>

        </View>



        <ProfileSections profile={profile} />
      </ScrollView>
      <Navbar />
    </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default ProfileScreen;