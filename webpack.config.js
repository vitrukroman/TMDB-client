const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  mode: process.env.NODE_ENV,
  entry: "./src/index.tsx",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        type: "javascript/auto",
        test: /\.mjs$/,
        use: [],
      },
      {
        test: /\.(graphql|gql)$/,
        exclude: /node_modules/,
        loader: 'graphql-tag/loader'
      }
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".graphql"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "src/index.html",
    }),
  ],
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "/",
  },
  devServer: {
    port: process.env.PORT,
    historyApiFallback: true,
  },
};
