import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { COLORS, config } from '../../constants';
import styles from '../../styles/profile';
import { Navbar } from '../../components';

const EditProfile = () => {
    const router = useRouter();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: ''
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleUpdate = async () => {
        try {
            setLoading(true);
            const token = await AsyncStorage.getItem('access');
            const response = await axios.put(
                `${config.API_BASE_URL}/api/profile/`,
                {
                    first_name: formData.firstName,
                    last_name: formData.lastName,
                    email: formData.email
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            Alert.alert('Success', 'Profile updated successfully');
            router.back();
        } catch (error) {
            Alert.alert('Error', error.response?.data?.message || 'Failed to update profile');
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
            <View style={styles.container}>
                <Text style={styles.title}>Edit Profile</Text>
                
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="First Name"
                        value={formData.firstName}
                        onChangeText={(value) => handleChange('firstName', value)}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Last Name"
                        value={formData.lastName}
                        onChangeText={(value) => handleChange('lastName', value)}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        value={formData.email}
                        onChangeText={(value) => handleChange('email', value)}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                </View>

                <TouchableOpacity 
                    style={[styles.button, loading && styles.buttonDisabled]}
                    onPress={handleUpdate}
                    disabled={loading}
                >
                    <Text style={styles.buttonText}>
                        {loading ? 'Updating...' : 'Update Profile'}
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={[styles.button, styles.cancelButton]}
                    onPress={() => router.back()}
                >
                    <Text style={[styles.buttonText, styles.cancelButtonText]}>
                        Cancel
                    </Text>
                </TouchableOpacity>
            </View>
            <Navbar />
        </SafeAreaView>
    );
};

export default EditProfile;
