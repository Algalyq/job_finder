import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
import config from '../../config';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      // Make POST request to /api/login/ endpoint
      const response = await fetch(`${config.baseURL}/api/login/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: 'admin@mail.kz',
          password: '123',
        }),
      });
      
      
      const data = await response.json();

      if (response.ok) {
        // If login is successful, store the token and navigate to HomeScreen
        const { access, refresh } = data;
        if (access) {
          // Store the access token, e.g., in AsyncStorage or state
          // For now, we'll log the token to the console
          console.log('Access Token:', access);
          

          // Store the access token and refresh token in AsyncStorage
          await AsyncStorage.setItem('access', access);
          await AsyncStorage.setItem('refresh', refresh);
          // Optionally, store the token in AsyncStorage or some global state
          navigation.navigate('Search');
        }
      } else {
        // If an error occurs, show the error message
        Alert.alert('Error', data.detail || 'Invalid email or password', [{ text: 'OK' }]);
      }
    } catch (error) {
      // If there's an issue with the network request, show a network error
      Alert.alert('Error', 'Network error. Please check your connection and try again.', [{ text: 'OK' }]);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none" 
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        secureTextEntry
        onChangeText={setPassword}
        autoCapitalize="none" 
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>LOGIN</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
        <Text style={styles.link}>Don't have an account? Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#F9F9F9',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 20,
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#3E1F92',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  link: {
    marginTop: 20,
    textAlign: 'center',
    color: '#3E1F92',
  },
});
