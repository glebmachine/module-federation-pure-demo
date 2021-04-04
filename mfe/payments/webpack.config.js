const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require('path');

module.exports = {
  mode: 'development',
  entry: "./mfe/payments/index.ts",
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
  resolve: {
    // Add `.ts` and `.tsx` as a resolvable extension.
    extensions: [".ts", ".tsx", ".js"]
  },
  module: {
    rules: [
      // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
      { test: /\.tsx?$/, loader: "ts-loader" }
    ]
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
        './Module': path.resolve(__dirname, "./public_api.ts"),
      },
      shared: {
        auth: {
          import: path.resolve(__dirname, '../../libs/auth.ts'),
          requiredVersion: false,
          eager: true,
        }
      }
    }),
  ],
};
