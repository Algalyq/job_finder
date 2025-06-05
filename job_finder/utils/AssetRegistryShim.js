/**
 * Utility to handle missing asset registry paths in Expo SDK 53
 */

// Create a mock asset registry handler
class AssetRegistry {
  static registerAsset(asset) {
    return asset;
  }
  
  static getAssetByID() {
    return null;
  }
}

// Export the asset registry
export default AssetRegistry;
