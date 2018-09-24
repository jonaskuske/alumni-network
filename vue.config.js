const CompressionWebpackPlugin = require('compression-webpack-plugin')
const zopfli = require('@gfx/zopfli')
const BrotliWebpackPlugin = require('brotli-webpack-plugin')

module.exports = {
  lintOnSave: true,
  baseUrl: '/alumni-network',
  pwa: {
    name: 'DMP Netzwerk',
    themeColor: '#4040e9',
    msTileColor: '#4040e9',
    appleMobileWebAppStatusBarStyle: 'black',
  },
  chainWebpack: config => {
    config.plugin('compress-gzip').use(CompressionWebpackPlugin, [
      {
        test: /\.(js|css|html|svg|json)$/,
        threshold: 10240,
        minRatio: 0.7,
        cache: true,
        compressionOptions: {
          numiterations: 15,
        },
        algorithm(input, compressionOptions, callback) {
          return zopfli.gzip(input, compressionOptions, callback)
        },
      },
    ])

    config.plugin('compress-brotli').use(BrotliWebpackPlugin, [
      {
        test: /\.(js|css|html|svg|json)$/,
        threshold: 10240,
        minRatio: 0.7,
      },
    ])
  },
}
