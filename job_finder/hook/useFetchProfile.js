import { useState, useCallback, useEffect } from 'react';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { API_BASE_URL } from '../constants/config';
import { useRouter } from 'expo-router';

const useFetchProfile = () => {
  const [profile, setProfile] = useState(null);
  const navigation = useNavigation(); // Access navigation

  const fetchProfile = useCallback(async () => {
    try {
      const accessToken = await AsyncStorage.getItem('access');
      if (!accessToken) {
        navigation.replace("auth/login"); // Redirect if token is missing
        return;
      }

      const response = await axios.get(`${API_BASE_URL}/api/profile/`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      setProfile(response.data);
    } catch (error) {
      if (error.response?.status === 401) {
        await AsyncStorage.removeItem('access');
        await AsyncStorage.removeItem('refresh');
        navigation.replace("auth/login"); // Redirect on unauthorized access
      }
      console.error('Error fetching profile:', error);
    }
  }, [navigation]);

  useFocusEffect(
    useCallback(() => {
      fetchProfile();
    }, [fetchProfile])
  );

  return { profile };
};

export default useFetchProfile;
