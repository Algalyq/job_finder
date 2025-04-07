import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  ScrollView,
  PermissionsAndroid,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { API_BASE_URL } from '../../constants/config';
import { useRouter } from 'expo-router';
import { HeaderBtn } from '../../components';
import { icons } from '../../constants';

const EditProfileScreen = ({ navigation }) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    first_name: '',
    last_name: '',
    job_title: '',
    avatar: null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    setLoading(true);
    setError(null);
    try {
      const accessToken = await AsyncStorage.getItem('access');
      console.log('Fetched Token:', accessToken);

      const response = await axios.get(`${API_BASE_URL}/api/update-profile/`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      const profileData = response.data.data;
      const userData = profileData.user || {};
      setFormData({
        username: userData.username || '',
        email: userData.email || '',
        first_name: userData.first_name || '',
        last_name: userData.last_name || '',
        job_title: profileData.job_title || '',
        avatar: profileData.avatar ? { uri: `${API_BASE_URL}${profileData.avatar}` } : null,
      });
    } catch (error) {
      setError('Failed to fetch profile data');
      console.error('Fetch Error:', error.response ? error.response.data : error.message);
      Alert.alert('Error', 'Failed to fetch profile data');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const requestCameraRollPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: 'Camera Roll Permission',
          message: 'This app needs access to your camera roll to upload photos.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        }
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.warn(err);
      return false;
    }
  };

  const handleImagePick = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const picked = result.assets[0];
      console.log(picked)
      setFormData(prev => ({
        ...prev,
        avatar: { uri: picked.uri }, // always wrapped
      }));
    }
    
  };
  


  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    const dataToSend = new FormData();
    const accessToken = await AsyncStorage.getItem('access');
    console.log('Submit Token:', accessToken);

    // Nest user fields under 'user' key as expected by the serializer
    dataToSend.append('user[username]', formData.username);
    dataToSend.append('user[email]', formData.email);
    dataToSend.append('user[first_name]', formData.first_name);
    dataToSend.append('user[last_name]', formData.last_name);

    // Add profile fields
    dataToSend.append('job_title', formData.job_title);

    // Handle avatar upload
    if (formData.avatar) {
      const randomFilename = `avatar_${Date.now()}_${Math.floor(Math.random() * 10000)}.jpg`;
    
      dataToSend.append('avatar', {
        uri: formData.avatar.uri,
        type: 'image/png',
        name: randomFilename,
      });
    }
    

    try {
      console.log('Sending Data:', Object.fromEntries([...dataToSend]));
      const response = await axios.put(`${API_BASE_URL}/api/update-profile/`, dataToSend, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        Alert.alert('Сәтті', 'Сәтті өтті');
        router.replace('/');
      }
    } catch (error) {
      setError('Failed to update profile');
      console.error('Submit Error:', error.response ? error.response.data : error.message);
      Alert.alert('Қате', 'Упс...');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Жүктеу...</Text>
      </SafeAreaView>
    );
  }

  const renderInputField = (field, placeholder, keyboardType = 'default', autoCapitalize = 'none') => {
    const value = formData[field];
    const isEmpty = !value || value.trim() === '';

    return (
      <View style={styles.inputWrapper}>
        {!isEmpty && <Text style={styles.label}>{placeholder}</Text>}
        <TextInput
          style={[styles.input, !isEmpty && styles.inputWithLabel]}
          placeholder={isEmpty ? placeholder : ''}
          value={value}
          onChangeText={(text) => handleInputChange(field, text)}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
          <HeaderBtn
                icon={icons.left}
                dimensions={24}
                onPress={() => router.back()}
              />
        <Text style={styles.title}>Жеке бетті өңдеу</Text>

        {error && <Text style={styles.errorText}>{error}</Text>}

        {/* Avatar Preview and Upload */}
        <TouchableOpacity onPress={handleImagePick} style={styles.avatarContainer}>
          {formData.avatar ? (
            <Image source={{ uri: formData.avatar.uri }} style={styles.avatar} />
          ) : (
            <View style={styles.avatarPlaceholder}>
              <Text style={styles.avatarText}>Жүктеу</Text>
            </View>
          )}
        </TouchableOpacity>


        {/* Form Fields */}
        <View style={styles.formContainer}>
          {renderInputField('username', 'Логин')}
          {renderInputField('email', 'Email', 'email-address')}
          {renderInputField('first_name', 'Есім')}
          {renderInputField('last_name', 'Тегі')}
          {renderInputField('job_title', 'Қызмет')}

          <Button title="Сақтау" onPress={handleSubmit} disabled={loading} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 30,
    textAlign: 'center',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 15,
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 25,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: '#ddd',
  },
  avatarPlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#ddd',
  },
  avatarText: {
    color: '#666',
    fontSize: 16,
  },
  formContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  inputWrapper: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
    fontWeight: '600',
  },
  input: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: '#fafafa',
  },
  inputWithLabel: {
    marginTop: 5,
  },
});

export default EditProfileScreen;