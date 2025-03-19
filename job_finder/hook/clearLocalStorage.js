import AsyncStorage from '@react-native-async-storage/async-storage';

// Function to clear AsyncStorage
const clearLocalStorage = async () => {
  try {
    await AsyncStorage.clear();
    console.log('AsyncStorage cleared successfully');
  } catch (error) {
    console.error('Error clearing AsyncStorage:', error);
  }
};

// Optional: Function to remove a specific key
const removeItem = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
    console.log(`Item "${key}" removed from AsyncStorage`);
  } catch (error) {
    console.error('Error removing item:', error);
  }
};

// Expose functions to the global scope for debugger access
global.clearLocalStorage = clearLocalStorage;
global.removeItem = removeItem;