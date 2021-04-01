const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require('path');

module.exports = {
  mode: 'development',
  entry: "./app/index.js",
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    port: 5000,
  },
  output: {
    chunkFilename: '[name]-[contenthash].js',
    uniqueName: "shell"
  },
  output: {
    publicPath: "/",
  },
  optimization: {
    runtimeChunk: false
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./app/index.html",
    }),
    new ModuleFederationPlugin({
        shared: {
          auth: {
            import: path.resolve(__dirname, '../libs/auth.js'),
            requiredVersion: false,
            eager: true,
          }
        }
    }),
  ],
};
