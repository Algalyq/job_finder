/**
 * App.js - Basic re-export of expo-router for compatibility with Expo SDK and Hermes
 */
import 'expo-router/entry';

// Set up global API_BASE_URL for use across the app
global.API_BASE_URL = global.__DEV__ 
  ? 'http://localhost:8000' // For development
  : 'http://your-production-api.com'; // For production

// Export an empty module - the real App handling is done by expo-router/entry
export default {};

