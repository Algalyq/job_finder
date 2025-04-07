import React, { createContext, useState, useContext, useEffect } from 'react';
import { isAuthenticated, login as authLogin, logout as authLogout, register as AuthRegister} from '../utils/auth';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const authenticated = await isAuthenticated();
      setIsLoggedIn(authenticated);
    } catch (error) {
      console.error('Error checking auth status:', error);
      setIsLoggedIn(false);
    } finally {
      setLoading(false);
    }
  };

  const login = async (username, password) => {
    try {
      const result = await authLogin(username, password);
      if (result.success) {
        setIsLoggedIn(true);
      }
      return result;
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: error.message };
    }
  };

  const register = async (username,email, first_name, last_name, password) => {
    try {
      const result = await AuthRegister(username,email, first_name, last_name, password);
      if (result.success) {
        setIsLoggedIn(true);
      }
      return result;
    } catch (error) {
      console.error('Registration error:', error);
      return { success: false, error: error.message };
    }
  };

  const logout = async () => {
    try {
      await authLogout();
      setIsLoggedIn(false);
      return true;
    } catch (error) {
      console.error('Logout error:', error);
      return false;
    }
  };

  if (loading) {
    return null; // or a loading spinner
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, checkAuthStatus, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
