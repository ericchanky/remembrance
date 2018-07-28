const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const autoprefixer = require('autoprefixer')

const isProd = process.env.NODE_ENV === 'production'
const dist = path.resolve(__dirname, './dist')

module.exports = {
  mode: isProd ? 'production' : 'development',
  entry: './src/app.js',
  output: {
    path: dist,
    filename: 'app.[hash].js',
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
          'style-loader', // creates style nodes from JS strings
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
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new CleanWebpackPlugin([dist]),
    new VueLoaderPlugin(),
    new CopyWebpackPlugin([
      { from: './manifest.json', to: '.' },
    ], {}),
  ],
}
