const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  publicPath: './', // 使用相对路径
  productionSourceMap: false, // 取消.map文件

  //链式webpack配置
  chainWebpack: (config) => {
    config.module
      .rule('images')
      .use('url-loader')
      .loader('url-loader')
      .tap(options => Object.assign(options, { limit: 20480 }));
  },
  // 常式webpack配置
  configureWebpack: (config) => {
    config.optimization = {
      minimizer: [
        // 去除console.*
        new UglifyJsPlugin({
          uglifyOptions: {
            warnings: false,
            compress: {
              drop_console: true,
              drop_debugger: true
            },
          }
        })
      ]
    }
  },
}