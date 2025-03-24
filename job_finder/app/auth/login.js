import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Alert, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../../context/AuthContext';

import { COLORS, SIZES } from '../../constants';
import styles from '../../styles/auth';

const Login = () => {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const { login } = useAuth();

    const handleLogin = async () => {
      if (!email || !password) {
        setError('Барлық өрістерді толтырыңыз');
        return;
      }

      try {
        setLoading(true);
        setError('');
        const result = await login(email, password);
        
        if (result.success) {
          console.log('Login successful, navigating...');
          router.replace('/');
        } else {
          console.error('Login failed:', result.error);
          setError(result.error || 'Кіру сәтсіз аяқталды');
        }
      } catch (error) {
        console.error('Login error:', error);
        setError('Күтпеген қате орын алды');
      } finally {
        setLoading(false);
      }
    };

    return (
        <View style={styles.container}>
            <View style={styles.logoContainer}>
                {/* <Image 
                    source={images.logo}
                    style={styles.logoImage}
                /> */}
            </View>

            <Text style={styles.title}>Қайта келгеніңізге қуаныштымыз</Text>
            
            {error ? (
              <Text style={styles.errorText}>{error}</Text>
            ) : null}
            
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Электрондық пошта"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Құпия сөз"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />
            </View>

            <TouchableOpacity 
                style={[styles.button, loading && styles.buttonDisabled]}
                onPress={handleLogin}
                disabled={loading}
            >
                {loading ? (
                    <ActivityIndicator color="#FFFFFF" />
                ) : (
                    <Text style={styles.buttonText}>Кіру</Text>
                )}
            </TouchableOpacity>

            <View style={styles.footer}>
                <Text style={styles.footerText}>Тіркелгіңіз жоқ па? </Text>
                <TouchableOpacity onPress={() => router.push('/auth/register')}>
                    <Text style={styles.footerLink}>Тіркелу</Text>
                </TouchableOpacity>
            </View>        </View>
    );
};

export default Login;
