const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require('path');

module.exports = {
  mode: 'development',
  entry: "./app/index",
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
      template: "./app/index.html",
    }),
    new ModuleFederationPlugin({
        shared: {
          auth: {
            import: path.resolve(__dirname, '../libs/auth.ts'),
            requiredVersion: false,
            eager: true,
          }
        }
    }),
  ],
};
