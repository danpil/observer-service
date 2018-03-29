const path = require('path');
const webpackNodeExternals = require('webpack-node-externals');

const config = {
  target: 'node',

  entry: './start.js',

  output: {
    filename: 'www.js',
    path: path.resolve(__dirname, 'bin'),
  },

  module: {
    rules: [
      {
        test: /\.js?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: ['env'],
        },
      },
    ],
  },

  externals: [webpackNodeExternals()],
};

module.exports = config;
