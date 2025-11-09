const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require("webpack");
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');

module.exports = {
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    publicPath: '/',
  },
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "public", "index.html"),
      title: 'Production',
      favicon: "./public/favicon.ico",
      filename: "index.html",
    }),
    new WebpackManifestPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env.REACT_APP_BACKEND_API': JSON.stringify(process.env.REACT_APP_BACKEND_API),
      'process.env.REACT_APP_QUERIDO_DIARIO_API': JSON.stringify(process.env.REACT_APP_QUERIDO_DIARIO_API),
    }),
  ],
  resolve: {
    alias: {
      '@app': path.resolve(__dirname, 'src'),
    },
    extensions: ['.tsx', '.ts', '.js', '.jsx', '.jpeg', '.png', '.svg'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        include: path.resolve(__dirname, "src"),
        use: [{
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', {
                "targets": "defaults" 
              }],
              ['@babel/preset-react', {"runtime": "automatic"}],
              ["@babel/preset-typescript"],
            ]
          }
        }]
      },
      {
        test: /\.(css|scss)$/i,
        use: [
          "style-loader",
          "css-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.(png|jp(e*)g|svg|gif|ico)$/,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
    ]
  },
};
