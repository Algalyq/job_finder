import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';  
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import { useRouter } from 'expo-router';
import { API_BASE_URL } from '../../constants/config'

const AboutMe = () => {
    const router = useRouter();
    const navigation = useNavigation();
    const [aboutMe, setAboutMe] = useState('');
    const [isLoading, setIsLoading] = useState(true);  // To handle loading state
    
    useEffect(() => {
        // Fetch the 'about_me' data when the component mounts
        const fetchAboutMe = async () => {
            try {
                const accessToken = await AsyncStorage.getItem('access');
                const response = await axios.get(`${API_BASE_URL}/api/profile/`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                });
                setAboutMe(response.data.about_me || '');  // Set the fetched data to state
            } catch (error) {
                console.error('Error fetching about me:', error);
                Alert.alert('Error', 'Failed to load your profile.');
            } finally {
                setIsLoading(false);  // Stop the loading state
            }
        };
        
        fetchAboutMe();
    }, []);

    const handleSave = async () => {
        try {
            setIsLoading(true);  // Set loading state when saving
            const accessToken = await AsyncStorage.getItem('access');
            const response = await axios.put(
                `${API_BASE_URL}/api/profile/about`,
                { about_me: aboutMe },
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,  // Use your actual token here
                    },
                }
            );

            if(response.status === 200){
                navigation.goBack();
            }

            // Handle success
        } catch (error) {
            console.error('Error updating about me:', error);
            Alert.alert('Error', 'Failed to update your profile.');
        } finally {
            setIsLoading(false);  // Stop the loading state
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.backButton}> 
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon name="arrow-back" size={24} color="#130160" />
                </TouchableOpacity>
            </View>

            <Text style={styles.header}>About me</Text>

            <TextInput
                style={styles.input}
                placeholder="Tell me about you."
                value={aboutMe}
                onChangeText={setAboutMe}
                multiline
                editable={!isLoading}  // Disable editing while loading
            />

            <TouchableOpacity 
                style={styles.button} 
                onPress={handleSave}
                disabled={isLoading}  // Disable the button if loading
            >
                <Text style={styles.buttonText}>SAVE</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#000',
    },
    input: {
        height: 220,
        backgroundColor: '#FFF',
        borderRadius: 10,
        padding: 16,
        fontSize: 16,
        color: '#555',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
        marginBottom: 20,
    },
    button: {
        position: 'absolute', 
        bottom: 48,           
        left: 20,             
        right: 20,            
        backgroundColor: '#15005B',
        borderRadius: 10,
        paddingVertical: 15,
        alignItems: 'center',
    },
    backButton: {
        gap: 16
    },  
    buttonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default AboutMe;
