/* eslint "no-var": 0 */
/* eslint "comma-dangle": 0 */

var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: ['./index.js'],
  output: {
    path: path.resolve(__dirname),
    filename: 'bundle.js'
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
