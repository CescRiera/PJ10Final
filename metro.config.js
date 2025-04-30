// metro.config.js
const { getDefaultConfig } = require('@expo/metro-config');

module.exports = (() => {
  const config = getDefaultConfig(__dirname);

  // Agregamos 'csv' a los assetExts
  config.resolver.assetExts = [
    ...config.resolver.assetExts,
    'csv'
  ];

  return config;
})();

