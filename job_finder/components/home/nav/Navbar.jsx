import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { useRouter, usePathname } from 'expo-router';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './navbar.style';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();

  // Define active and inactive colors
  const activeColor = '#130160'; // Primary blue color
  const inactiveColor = '#9A9A9A'; // Gray for inactive

  const handleNavigate = async (route) => {
    try {
      // Check authentication for protected routes
      // const token = await AsyncStorage.getItem('access');
      // if (!token) {
      //   router.replace('/auth/login');
      //   return;
      // }

      // Don't navigate if already on the page
      if (route === pathname) return;
      
      router.push(route);
    } catch (error) {
      console.error('Navigation error:', error);
    }
  };

  return (
    <View style={styles.footerContainer}>
      <TouchableOpacity
        style={[styles.iconButton, pathname === '/' && styles.activeButton]}
        onPress={() => handleNavigate('/')}
      >
        <Icon
          name="home-outline"
          size={24}
          color={pathname === '/' ? activeColor : inactiveColor}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.iconButton, pathname.includes('/saved-jobs') && styles.activeButton]}
        onPress={() => handleNavigate('/saved-jobs')}
      >
        <Icon
          name="bookmark-outline"
          size={24}
          color={pathname.includes('/saved-jobs') ? activeColor : inactiveColor}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.iconButton, pathname.includes('/messages') && styles.activeButton]}
        onPress={() => handleNavigate('/messages')}
      >
        <Icon
          name="chatbubble-outline"
          size={24}
          color={pathname.includes('/messages') ? activeColor : inactiveColor}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.iconButton, pathname.includes('/profile') && styles.activeButton]}
        onPress={() => handleNavigate('/profile')}
      >
        <Icon
          name="person-outline"
          size={24}
          color={pathname.includes('/profile') ? activeColor : inactiveColor}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Navbar;