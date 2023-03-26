const HtmlWebpackPlugin = require("html-webpack-plugin");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const path = require("path");

module.exports = {
  cache: false,
  plugins: [
    new HtmlWebpackPlugin({
      hash: true,
      title: "Webpack Demo App",
      template: "./src/index.html",
      filename: "index.html",
      inject: "body",
    }),
    new MiniCssExtractPlugin({
      filename: "style.css",
    }),
  ],
  mode: "development",
  entry: "./src/index.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },

  devServer: {
    static: "./dist",
    open: true,
  },
  module: {
    rules: [
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/,

        type: "asset/resource",
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
    ],
  },
};

// webpack.config.js
