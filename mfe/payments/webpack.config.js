const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require('path');

module.exports = {
  mode: 'development',
  entry: "./mfe/payments/index.js",
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    port: 3001,
  },
  output: {
    chunkFilename: '[name]-[contenthash].js',
    uniqueName: "shell"
  },
  output: {
    publicPath: "auto",
  },
  optimization: {
    runtimeChunk: false
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./mfe/payments/index.html",
    }),
    new ModuleFederationPlugin({
      name: "payments",
      library: { type: "var", name: "payments" },
      filename: "remoteEntry.js",
      exposes: {
        './Module': path.resolve(__dirname, "./public_api.js"),
      },
      shared: {
        auth: {
          import: path.resolve(__dirname, '../../libs/auth.js'),
          requiredVersion: false,
          eager: true,
        }
      }
    }),
  ],
};
