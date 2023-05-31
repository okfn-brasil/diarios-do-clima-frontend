const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require("webpack");
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const options = {
  "short_name": "Diário do Clima",
  "name": "Diário do Clima",
  "icons": [
    {
      "src": "logo.ico",
      "sizes": "64x64 32x32 24x24 16x16",
      "type": "image/x-icon"
    },
    {
      "src": "logo.png",
      "type": "image/png",
      "sizes": "192x192"
    },
    {
      "src": "logo.png",
      "type": "image/png",
      "sizes": "512x512"
    }
  ],
  "start_url": ".",
  "display": "standalone",
  "theme_color": "#000000",
  "background_color": "#ffffff"
};

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
    new HtmlWebpackPlugin({ template: path.resolve(__dirname, "public", "index.html"),
      title: 'Production',
      favicon: "./public/logo.ico",
      filename: "index.html",
    }),
    new WebpackManifestPlugin(options),
    new webpack.HotModuleReplacementPlugin(),
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
