import AsyncStorage from '@react-native-async-storage/async-storage';

export const BASE_URL = 'http://localhost:8000/api';

// Store auth tokens
export const setAuthTokens = async (access, refresh) => {
  try {
    await AsyncStorage.multiSet([
      ['access', access],
      ['refresh', refresh],
    ]);
    return true;
  } catch (error) {
    console.error('Error storing auth tokens:', error);
    return false;
  }
};

// Get auth tokens
export const getAuthTokens = async () => {
  try {
    const tokens = await AsyncStorage.multiGet(['access', 'refresh']);
    return {
      access: tokens[0][1],
      refresh: tokens[1][1],
    };
  } catch (error) {
    console.error('Error getting auth tokens:', error);
    return { access: null, refresh: null };
  }
};

// Clear auth tokens
export const clearAuthTokens = async () => {
  try {
    await AsyncStorage.multiRemove(['access', 'refresh']);
    return true;
  } catch (error) {
    console.error('Error clearing auth tokens:', error);
    return false;
  }
};

// Check if user is authenticated
export const isAuthenticated = async () => {
  try {
    const { access, refresh } = await getAuthTokens();
    return !!(access && refresh);
  } catch (error) {
    console.error('Error checking authentication:', error);
    return false;
  }
};

// Login function
export const login = async (email, password) => {
  try {
    const response = await fetch(`${BASE_URL}/login/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || data.detail || 'Login failed');
    }

    if (!data.access || !data.refresh) {
      throw new Error('Invalid authentication response');
    }

    // Store both tokens
    const success = await setAuthTokens(data.access, data.refresh);
    if (!success) {
      throw new Error('Failed to store authentication tokens');
    }

    return { success: true };
  } catch (error) {
    console.error('Login error:', error);
    await clearAuthTokens(); // Clean up any partial tokens
    return {
      success: false,
      error: error.message || 'An error occurred during login'
    };
  }
};

// Logout function
export const logout = async () => {
  try {
    await clearAuthTokens();
    return true;
  } catch (error) {
    console.error('Logout error:', error);
    return false;
  }
};
