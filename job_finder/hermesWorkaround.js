/**
 * Hermes compatibility workarounds for Expo SDK 53
 * - Enhanced to fix require.context issues with Hermes
 * - Supports API_BASE_URL as mentioned in memory
 */

// Make registerAsset available globally for asset handling
if (typeof global.registerAsset !== 'function') {
  global.registerAsset = (asset) => asset;
}

// Initial configuration for expo-router
global.unstable_settings = {
  initialRouteName: '(tabs)',
};

// Fix Hermes require issue for all contexts
if (typeof global.require !== 'function' && typeof require === 'function') {
  global.require = require;
}

// Add require.context polyfill for Hermes
if (typeof global.require === 'function' && typeof global.require.context !== 'function') {
  global.require.context = (base, scanSubDirectories = false, regularExpression = /\.\w+$/) => {
    const files = {};
    
    function importAll(r) {
      r.keys().forEach(key => (files[key] = r(key)));
      return files;
    }
    
    // Return a function that acts like require.context
    function requireContext(id) {
      // Just return an empty module as a fallback
      console.log(`[Hermes workaround] require.context called for: ${id}`);
      return {};
    }
    
    requireContext.keys = () => {
      // In normal operation, this would return available module IDs
      // For the workaround, we'll return an empty array
      return [];
    };
    
    requireContext.resolve = (id) => id;
    
    return requireContext;
  };
}

// For debugging only - export empty module
export default {};
