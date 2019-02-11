const path = require('path');
// const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');
const mode = process.env.NODE_ENV || 'development';
const isProd = mode === 'production';
require('dotenv').config();
const env = process.env;

module.exports = {
  entry: './index.js',
  devtool: isProd ? false: 'source-map',
  mode: mode,
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
  devServer: {
    contentBase: 'dist',
    hot: true
  },
  plugins: [
    // new CleanWebpackPlugin(['dist']),
    new webpack.DefinePlugin({
      PRODUCTION: JSON.stringify(isProd),
      BASE_URL: env.BASE_URL,
      TEST_API_KEY: env.TEST_API_KEY
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    rules: [

      // SCSS to CSS to PostCSS chain
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          "style-loader", // creates style nodes from JS strings
          "css-loader", // translates CSS into CommonJS
          "sass-loader" // compiles Sass to CSS, using Node Sass by default
        ]
      },

      {
        test: /\.svelte$/,
        exclude: /node_modules/,
        use: {
          loader: 'svelte-loader',
          options: {
            hotReload: true
          }
        }
      },

      {
        test: /\.html$/,
        exclude: /node_modules/,
        use: {
          loader: 'svelte-loader',
          options: {
            skipIntroByDefault: true,
            nestedTransitions: true,
            emitCss: true,
            hotReload: true
          }
        }
      }
    ]
  },
};