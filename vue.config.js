const CompressionWebpackPlugin = require('compression-webpack-plugin')
const zopfli = require('@gfx/zopfli')
const BrotliWebpackPlugin = require('brotli-webpack-plugin')

module.exports = {
  lintOnSave: true,
  publicPath: '/alumni-network',
  assetsDir: 'assets',
  pwa: {
    name: 'DMP Netzwerk',
    themeColor: '#4040e9',
    msTileColor: '#4040e9',
    appleMobileWebAppStatusBarStyle: 'black',
  },
  chainWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
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
    }
  },
}
