/**
 * Main entry point for the app
 * Simplified to use expo-router/entry properly
 */
import { LogBox } from 'react-native';
import { Platform } from 'react-native';

// Import our Hermes workarounds first
require('./hermesWorkaround');

// Define API_BASE_URL correctly so it's available before App loads
global.API_BASE_URL = Platform.OS === 'web' 
  ? 'http://localhost:8000' // For web development
  : `http://${Platform.OS === 'ios' ? '172.20.6.136' : '192.168.1.x'}:8000`; // Use your actual device IP

console.log('API_BASE_URL initialized to:', global.API_BASE_URL);

// Ignore common warnings for better development experience
LogBox.ignoreLogs([
  'Unable to resolve',
  'Non-serializable values',
  'Require cycle',
  'Property \'require\' doesn\'t exist',
  'No filename found',
]);

// Import App which uses expo-router/entry
import './App';