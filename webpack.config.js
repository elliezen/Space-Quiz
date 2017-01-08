'use strict';

let HtmlWebpackPlugin = require('html-webpack-plugin');
let ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  context: __dirname + '/src',

  entry: './main',
  output: {
    path: __dirname,
    publicPath: '',
    filename: 'bundle.js'
  },

  watch: true,

  resolve: {
    extensions: ['', '.js']
  },

  watchOptions: {
    aggregateTimeout: 100
  },

  module: {

    loaders: [{
      test: /\.js$/,
      loader: 'babel',
      query: {
        presets: ['es2015']
      }
    }, {
      test: /\.pug$/,
      loader: 'pug'
    }, {
      test: /\.scss$/,
      loader: ExtractTextPlugin.extract('style-loader', 'css!sass')
    }, {
      test:   /\.(png|jpg|wav)$/,
      loader: 'file?name=[path][name].[ext]'
    }]

  },

  plugins: [
    new ExtractTextPlugin('style.css', {
      allChunks: true
    }),
    new HtmlWebpackPlugin({
      template: './index.pug'
    }),
  ]
};
