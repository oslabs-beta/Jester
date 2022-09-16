const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './client/index.js',
  devtool: 'inline-source-map',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
  devServer: {
    host: 'localhost',
    port: 8080,
    static: {
      directory: path.resolve(__dirname, 'dist'),
      publicPath: '/',
    },
    hot: true,
    proxy: {},
  },
  resolve: { extensions: ['*', '.js', '.jsx'] },
  plugins: [new HTMLWebpackPlugin({ template: './client/index.html' })],
};
