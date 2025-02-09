const path = require('path');
const config = require('./config.json');

module.exports = {
  port: 9012,
  root: config[config.startType].appName,
  stat: false,
  timestamp: false,
  webpack: {
    console: true,
    publicPath: '/'+config[config.startType].appName+'/',
    output: {
      './index.html': {
        entry: './src/app'
      }
    },
    alias: {
      model: './src/js/model/',
      js: './src/js/',
      components: './src/components/',
      views: './src/views/'
    },
    global: {
      Utils: [path.resolve(__dirname, 'src/js/common/utils'), 'default'],
      Manba: 'manba',
      HeyUI: 'heyui',
      Model: 'js-model',
      G: 'hey-global',
      log: 'hey-log',
      _: 'lodash',
      R: [path.resolve(__dirname, 'src/js/common/request'), 'default'],
    },
    devServer: {
      proxy: {
        '/kb-api': {
          target: 'http://localhost:3000'
        }
      },
      historyApiFallback: true
    },
    globalVars: './src/css/var.less',
    externals: {}
  },
  copy: ['./src/static/**/*','./config.json']
};
