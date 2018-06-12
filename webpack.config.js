/* eslint "no-var": 0 */
/* eslint "comma-dangle": 0 */

const path = require('path');
// const webpack = require('webpack');
const mode = process.env.NODE_ENV || 'development';

module.exports = {
  mode,
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
