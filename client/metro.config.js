const { getDefaultConfig } = require('expo/metro-config')
const path = require('path')

const defaultConfig = getDefaultConfig(__dirname)

defaultConfig.resolver.extraNodeModules = {
  '@components': path.resolve(__dirname, 'components'),
  '@app': path.resolve(__dirname, 'app'),
}

defaultConfig.watchFolders = [
  path.resolve(__dirname, 'components'),
  path.resolve(__dirname, 'app'),
]

module.exports = defaultConfig
