const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const autoprefixer = require('autoprefixer')

const isProd = process.env.NODE_ENV === 'production'
const dist = path.resolve(__dirname, './dist')

const config = {
  mode: isProd ? 'production' : 'development',
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        parallel: true,
        cache: true,
      }),
      new OptimizeCSSAssetsPlugin({}),
    ],
    splitChunks: {
      chunks: 'all',
      name: 'vendors',
    },
    nodeEnv: process.env.NODE_ENV,
  },
  entry: './src/app.js',
  output: {
    path: dist,
    filename: 'app.[hash].js',
    chunkFilename: '[name].[chunkhash].js',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['env', 'stage-0'],
            },
          },
        ],
      },
      {
        test: /.vue$/,
        exclude: /node_modules/,
        use: 'vue-loader',
      },
      {
        test: /\.s?(a|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader', // translates CSS into CommonJS
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [
                autoprefixer({ browsers: ['last 3 versions', '> 1%'] }),
              ],
            },
          },
          {
            loader: 'sass-loader', // compiles Sass to CSS
            options: {
              includePaths: ['./node_modules'],
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.ts', '.vue', '.sass', '.css', '.wasm', '.mjs', '.json'],
    alias: {
      vue: 'vue/dist/vue.common.js',
    },
  },
  devServer: {
    contentBase: dist,
    port: 8080,
    hot: true,
    open: true,
    compress: true,
    watchContentBase: true,
    historyApiFallback: true,
  },
  plugins: [
    new VueLoaderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({ template: './src/index.html' }),
    new MiniCssExtractPlugin({
      filename: 'app.[contenthash].css',
      chunkFilename: 'vendors.[contenthash].css',
    }),
  ],
}

if (isProd) {
  config.plugins.push(
    new CleanWebpackPlugin([dist]),
    new CopyWebpackPlugin([
      { from: './manifest.json', to: '.' },
    ], {}),
  )
}

module.exports = config
