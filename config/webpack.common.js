var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var ProvidePlugin = require('webpack/lib/ProvidePlugin');
var helpers = require('./helpers');
const autoprefixer = require('autoprefixer');

module.exports = {
  entry: {
    'polyfills': './src/polyfills.ts',
    'vendor': './src/vendor.ts',
    'app': './src/main.ts'
  },

  resolve: {
    extensions: ['', '.js', '.ts']
  },

  postcss: [autoprefixer],

  module: {
    loaders: [
      {
        test: /\.ts$/,
        loader: 'ts'
      },
      { 
        test: /\.scss$/, loaders: ['style', 'css', 'postcss', 'sass'] 
      },
      { 
        test: /\.(woff2?|ttf|eot|svg)$/, loader: 'url?limit=10000' 
      },
        // Bootstrap 4
      { 
        test: /bootstrap\/dist\/js\/umd\//, loader: 'imports?jQuery=jquery' 
      },
      {
        test: /\.html$/,
        loader: 'html'
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
        loader: 'file?name=assets/[name].[hash].[ext]'
      },
      {
        test: /\.css$/,
        exclude: helpers.root('src', 'app'),
        loader: ExtractTextPlugin.extract('style', 'css?sourceMap')
      },
      {
        test: /\.css$/,
        include: helpers.root('src', 'app'),
        loader: 'raw'
      }
    ]
  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: ['app', 'vendor', 'polyfills']
    }),

    new ProvidePlugin({
      jQuery: 'jquery',
      $: 'jquery',
      jquery: 'jquery'
    }),

    new HtmlWebpackPlugin({
      template: 'src/index.html'
    })
  ]
};
