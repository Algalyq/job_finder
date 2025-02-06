import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import Footer from '../components/Footer';
import { useNavigation, useFocusEffect } from '@react-navigation/native';  
import ProfileSections from '../components/ProfileSections';
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import axios from 'axios';  
import config from '../../config';  // Import your config for base URL
import { ScrollView } from 'react-native-gesture-handler';




const ProfileScreen = () => {
    const navigation = useNavigation();
    const [profile, setProfile] = useState(null);

    useFocusEffect(
        React.useCallback(() => {
            const fetchProfile = async () => {
                try {
                    const accessToken = await AsyncStorage.getItem('access');
                    const response = await axios.get(`${config.baseURL}/api/profile/`, {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                        },
                    });
                    console
                    setProfile(response.data);
                } catch (error) {
                    console.error('Error fetching profile:', error);
                }
            };

            fetchProfile();
        }, [])  
    );

    if (!profile) {
        return <Text>Loading...</Text>;
    }

    return (
        <SafeAreaView style={styles.container}>
            {/* Profile Header */}
            <ScrollView style={styles.scroll} contentContainerStyle={{ paddingBottom: 36 }}>
            <View style={styles.header}>
                <Image source={{ uri: profile.avatar || 'https://via.placeholder.com/50' }} style={styles.picture} />
                <View style={styles.infoContainer}>
                    <Text style={styles.title}>{profile.job_title || 'Position'}</Text>
                    <Text style={styles.name}>{profile.full_name || 'Name'}</Text>
                </View>
            </View>

            <ProfileSections profile={profile} />

            </ScrollView>
            <Footer />
            
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        padding: 16,
        flexDirection: 'row',
        alignItems: 'center',
    },
    title: {
        fontSize: 16,
        fontWeight: '700',
    },
    name: {
        fontSize: 14,
        color: '#333',
    },
    infoContainer: {
        justifyContent: 'center',
        gap: 8,
    },
    picture: {
        width: 84,
        height: 84,
        borderRadius: 48,
        marginRight: 16,
    },
    sectionsContainer: {
        marginTop: 20,
    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
        marginHorizontal: 16,
        marginBottom: 10,
        backgroundColor: 'white',
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    sectionIcon: {
        marginRight: 16,
    },
    sectionTitle: {
        flex: 1,
        fontSize: 16,
        color: '#333',
    },
    scroll: {
        color: '#000',
        height: '120%'
    }
});

export default ProfileScreen;
