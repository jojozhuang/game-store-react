const path = require("path");
const glob = require("glob");
const { merge } = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const webpack = require("webpack");

const parts = require("./webpack.parts");

const PATHS = {
  app: path.join(__dirname, "src"),
};

const commonConfig = merge([
  {
    entry: "./src/index.js",
    output: {
      path: path.join(__dirname, "dist"),
      filename: "[name].[contenthash].js",
      publicPath: process.env.HOST_URL || "/",
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: "babel-loader",
        },
      ],
    },
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        title: "Game Store React",
        template: path.join(PATHS.app, "index.html"),
        favicon: path.join(__dirname, "public/assets/favicon.ico"),
      }),
      new webpack.HotModuleReplacementPlugin(), // hot reload for dev
    ],
  },
]);

const productionConfig = merge([
  parts.loadEnv("https://gamestore-api.azurewebsites.net"),
  parts.extractCSS({ use: ["css-loader"] }),
  parts.purgeCSS({ paths: glob.sync(`${PATHS.app}/**/*.js`, { nodir: true }) }),
  parts.loadImages({
    options: { name: "images/[name].[ext]", publicPath: "../" },
  }),
  parts.loadFonts({
    options: { name: "fonts/[name].[ext]", publicPath: "../" },
  }),
  parts.loadStatic(),
]);

const developmentConfig = merge([
  parts.loadEnv("http://localhost:8080"),
  parts.devServer({
    host: process.env.HOST || "localhost",
    port: process.env.PORT || 12090,
  }),
  parts.loadCSS(),
  parts.loadImages(),
  parts.loadFonts(),
  {
    devtool: "eval-cheap-module-source-map", // faster rebuilds
    mode: "development",
  },
]);

module.exports = (env) => {
  if (env && env.production) {
    return merge(commonConfig, productionConfig, { mode: "production" });
  }
  return merge(commonConfig, developmentConfig, { mode: "development" });
};
