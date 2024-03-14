const path = require("path");
const baseUrl = "../src/renderer";
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: path.resolve(__dirname, baseUrl + "/index.tsx"),
  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: "[name].[hash:8].js",
  },
  resolve: {
    extensions: [".js", ".ts", ".tsx", ".jsx", ".json"],
  },
  module: {
    rules: [
      {
        test: /.(jsx?)|(tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              [
                "@babel/preset-env",
                {
                  // 在electron中,其实不需要polyfill,因为electron已经内置了
                  //   targets: "last 2 versions, >1%,not dead",
                  useBuiltIns: "usage",
                  corejs: 3,
                },
              ],
              ["@babel/preset-typescript"],
              ["@babel/preset-react"],
            ],
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, baseUrl + "/public/index.html"),
    }),
  ],
};
