/* eslint "no-var": 0 */
/* eslint "comma-dangle": 0 */

const path = require('path');
// const webpack = require('webpack');

module.exports = {
  mode: 'production',
  entry: ['./index.js'],
  output: {
    path: path.resolve(__dirname),
    filename: 'server.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['env']
        }
      }
    ],
  },
  stats: {
    colors: true
  },
  devtool: 'source-map',
  target: 'node'
};
