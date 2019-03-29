const path = require('path');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

require('dotenv').config();

module.exports = (env, argv) => {
  const isProd = argv.mode === 'production';
  
  const config = {
    entry: isProd ? './index.js' : {
      chat: './index.js',
      test: './test.js'
    },
    devtool: isProd ? false : 'source-map',
    mode: argv.mode,
    output: {
      path: path.resolve(__dirname, 'dist')
    },
    devServer: {
      contentBase: 'dist',
      hot: true
    },
    plugins: [
      new CleanWebpackPlugin(['dist']),
      new webpack.DefinePlugin({
        PRODUCTION: JSON.stringify(isProd),
        BASE_URL: JSON.stringify(process.env.BASE_URL),
        TEST_API_KEY: JSON.stringify(process.env.TEST_API_KEY)
      }),
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
              hotReload: !isProd
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
              hotReload: !isProd
            }
          }
        }
      ]
    },
    optimization: {}
  }

  if (isProd) {
    // Remove console logs in prod
    config.optimization.minimizer = [
      new TerserPlugin({
        terserOptions: {
          compress: {
            drop_console: true,
          },
        },
      })
    ];

    config.output.filename = 'chat.js';

  } else {
    // Hotmodule and HTML test page only in dev
    config.plugins.push(new HtmlWebpackPlugin());
    config.plugins.push(new webpack.HotModuleReplacementPlugin());
  }

  return config;
};