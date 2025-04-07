import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Alert, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../../context/AuthContext';

import { COLORS, SIZES } from '../../constants';
import styles from '../../styles/auth';
import { images } from '../../constants';

const Register = () => {
    const router = useRouter();
    const { login,register } = useAuth();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        firstName: '',
        lastName: ''
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleRegister = async () => {
        // Validate form data
        if (!formData.email || !formData.password || !formData.firstName || !formData.lastName) {
            Alert.alert('Қате', 'Барлық өрістерді толтырыңыз');
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            Alert.alert('Қате', 'Құпия сөздер сәйкес келмейді');
            return;
        }

        if (formData.password.length < 6) {
            Alert.alert('Қате', 'Құпия сөз кемінде 6 таңбадан тұруы керек');
            return;
        }

        try {
            setLoading(true);
            const { success, error } = await register({
                username: formData.username,
                email: formData.email,
                password: formData.password,
                first_name: formData.firstName,
                last_name: formData.lastName
            });
            
            if (success) {
                // After successful registration, automatically log in
                const loginResult = await login(formData.username, formData.password);
                if (loginResult.success) {
                    router.replace('/');
                } else {
                    Alert.alert('Қате', 'Тіркелу сәтті болды, бірақ кіру кезінде қате орын алды');
                }
            } else {
                Alert.alert('Қате', error || 'Тіркелу сәтсіз аяқталды');
            }
        } catch (error) {
            console.error('Registration error:', error);
            Alert.alert('Қате', 'Күтпеген қате орын алды');
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

            <Text style={styles.title}>Тіркелу</Text>
            
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Логин"
                    value={formData.username}
                    onChangeText={(value) => handleChange('username', value)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Аты"
                    value={formData.firstName}
                    onChangeText={(value) => handleChange('firstName', value)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Тегі"
                    value={formData.lastName}
                    onChangeText={(value) => handleChange('lastName', value)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Электрондық пошта"
                    value={formData.email}
                    onChangeText={(value) => handleChange('email', value)}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Құпия сөз"
                    value={formData.password}
                    onChangeText={(value) => handleChange('password', value)}
                    secureTextEntry
                />
                <TextInput
                    style={styles.input}
                    placeholder="Құпия сөзді қайталаңыз"
                    value={formData.confirmPassword}
                    onChangeText={(value) => handleChange('confirmPassword', value)}
                    secureTextEntry
                />
            </View>

            <TouchableOpacity 
                style={[styles.button, loading && styles.buttonDisabled]}
                onPress={handleRegister}
                disabled={loading}
            >
                {loading ? (
                    <ActivityIndicator color="#FFFFFF" />
                ) : (
                    <Text style={styles.buttonText}>Тіркелу</Text>
                )}
            </TouchableOpacity>

            <View style={styles.footer}>
                <Text style={styles.footerText}>Тіркелгіңіз бар ма? </Text>
                <TouchableOpacity onPress={() => router.push('/auth/login')}>
                    <Text style={styles.footerLink}>Кіру</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Register;
