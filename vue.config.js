let path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
module.exports = {
  chainWebpack: (config) => {
    // 移除 prefetch 插件
    config.plugins.delete('prefetch')
    config
      .plugin('vue-loader')
      .use(VueLoaderPlugin)

    // 配置别名
    config.resolve.alias.set('@', path.join(__dirname, './src'))
    
    // config.module.rule('js').include.add(/node_modules\/vue-plyr\/.*/)
    // 配置兼容性
    config.resolve.alias.set('querystring', 'querystring-browser')
    // config.entry('main').add('babel-polyfill') // main是入口js文件
    config.entry.app = ['babel-polyfill', './src/main.js']
  },
  css: {
    loaderOptions: {
      less: {}
    }
  },
  devServer: {
    // 配置代理
    proxy: {
      '/api': {
        target: 'http://39.98.210.75',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    },
    port: 80,
    disableHostCheck: true
  },
  transpileDependencies: [
    'vue-plyr'
  ]
}
