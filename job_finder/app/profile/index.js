import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, Modal, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';
import useFetchProfile from '../../hook/useFetchProfile'; // Import custom hook
import styles from '../../styles/profile'; // Import styles
import { ProfileSections, Navbar } from "../../components"
import { images, COLORS } from '../../constants';
import { Ionicons, Entypo } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { API_BASE_URL } from '../../constants/config';

const ProfileScreen = () => {
  const { profile } = useFetchProfile();
  
  // State for modal visibility
  const [modalVisible, setModalVisible] = useState(false);
  
  // Loading state
  if (!profile) {
    return <Text>Жүктелуде...</Text>;
  }

  console.log(profile)
  // Handle logout action
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('access');
      await AsyncStorage.removeItem('refresh');
      router.replace('auth/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  // Open modal for profile options
  const modelViewOpen = () => {
    setModalVisible(true);
  };

  // Close modal
  const closeModal = () => {
    setModalVisible(false);
  };

  // Navigate to edit profile page (you can add your edit logic here)
  const handleEditProfile = () => {
    closeModal();
    // Navigate to the Edit Profile screen (you can implement this with React Navigation or other navigation tools)
    router.push('profile/edit');
  };

  return (
    <GestureHandlerRootView>
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scroll} contentContainerStyle={{ paddingBottom: 36 }}>
          <View style={styles.header}>
            <View style={styles.headerBody}>
              <Image
                source={
                  profile.avatar
                    ? { uri: `${API_BASE_URL}/${profile.avatar}` }
                    : require('../../assets/images/default_image.jpg') // fallback directly
                }
                style={styles.picture}
              />
              <View style={styles.infoContainer}>
                <Text style={styles.title}>{profile.full_name || 'Position'}</Text>
                <Text style={styles.name}>{profile.job_title || 'Сіздің қызметіңіз'}</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.headerButtons} onPress={modelViewOpen}>
              <Entypo name="dots-three-vertical" size={24} color={COLORS.tertiary} />
            </TouchableOpacity>
          </View>

          <ProfileSections profile={profile} />
        </ScrollView>

        <Navbar />
      </SafeAreaView>

      {/* Modal for profile options */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={closeModal}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Аккаунт бойынша қызметтер</Text>
            
            <TouchableOpacity onPress={handleEditProfile} style={styles.modalButton}>
              <Text style={styles.modalButtonText}>Өңдеу</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleLogout} style={styles.modalButton}>
              <Text style={styles.modalButtonText}>Шығу</Text>
            </TouchableOpacity>

            <Button title="Жабу" onPress={closeModal} />
          </View>
        </View>
      </Modal>
    </GestureHandlerRootView>
  );
};

export default ProfileScreen;
