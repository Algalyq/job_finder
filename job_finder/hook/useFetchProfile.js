import { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {config} from '../../constants'

const useFetchProfile = () => {
  const [profile, setProfile] = useState(null);

  const fetchProfile = useCallback(async () => {
    try {
      const accessToken = await AsyncStorage.getItem('access');
      const response = await axios.get(`${config.API_BASE_URL}/api/profile/`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setProfile(response.data);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // Handle unauthorized access
        await AsyncStorage.removeItem('access');
        await AsyncStorage.removeItem('refresh');
      }
      console.error('Error fetching profile:', error);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchProfile();
    }, [fetchProfile]) 
  );

  return { profile };
};

export default useFetchProfile;