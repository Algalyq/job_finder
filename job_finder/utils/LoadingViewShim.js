/**
 * LoadingViewShim.js
 * 
 * This is a compatibility shim that handles both older React Native versions
 * that use LoadingView and newer versions (0.76+) that use DevLoadingView.
 */

'use strict';

let RealLoadingView;

try {
  // Try to load DevLoadingView (React Native 0.76+)
  RealLoadingView = require('react-native/Libraries/Utilities/DevLoadingView');
} catch (e) {
  try {
    // Fall back to LoadingView (React Native < 0.76)
    RealLoadingView = require('react-native/Libraries/Utilities/LoadingView');
  } catch (e2) {
    // If both fail, provide a mock implementation that does nothing
    RealLoadingView = {
      showMessage: () => {},
      hide: () => {},
    };
  }
}

module.exports = RealLoadingView;
