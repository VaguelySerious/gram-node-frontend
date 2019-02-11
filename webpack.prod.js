const path = require('path');
const webpack = require('webpack');

const CleanWebpackPlugin = require('clean-webpack-plugin');

const mode = 'production';
const isProd = true;
const env = process.env;

require('dotenv').config();

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
    new CleanWebpackPlugin(['dist']),
    new webpack.DefinePlugin({
      PRODUCTION: JSON.stringify(true),
      BASE_URL: JSON.stringify(env.BASE_URL),
      TEST_API_KEY: JSON.stringify(env.TEST_API_KEY)
    }),
    new webpack.HotModuleReplacementPlugin(),
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