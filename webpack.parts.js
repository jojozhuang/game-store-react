const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const PurgeCSSPlugin = require("purgecss-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const webpack = require("webpack");

exports.devServer = ({ host, port } = {}) => ({
  devServer: {
    host: host || "localhost",
    port: port || 8080,
    open: true,
    historyApiFallback: true,
    hot: true,
    proxy: {
      "/api": {
        target: process.env.API_URL,
        changeOrigin: true,
      },
    },
  },
});

exports.loadCSS = ({ include, exclude } = {}) => ({
  module: {
    rules: [
      {
        test: /\.css$/,
        include,
        exclude,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
});

exports.extractCSS = ({ include, exclude, use }) => {
  const plugin = new MiniCssExtractPlugin({
    filename: "styles/[name].[contenthash].css",
  });

  return {
    module: {
      rules: [
        {
          test: /\.css$/,
          include,
          exclude,
          use: [MiniCssExtractPlugin.loader].concat(use),
        },
      ],
    },
    plugins: [plugin],
  };
};

exports.purgeCSS = ({ paths }) => ({
  plugins: [new PurgeCSSPlugin({ paths })],
});

exports.loadImages = ({ include, exclude, options } = {}) => ({
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        include,
        exclude,
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: (options && options.limit) || 8192,
          },
        },
        generator: {
          filename: options?.name || "images/[name][ext]",
          publicPath: options?.publicPath || "",
        },
      },
    ],
  },
});

exports.loadFonts = ({ include, exclude, options } = {}) => ({
  module: {
    rules: [
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        include,
        exclude,
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: (options && options.limit) || 10000,
          },
        },
        generator: {
          filename: options?.name || "fonts/[name][ext]",
          publicPath: options?.publicPath || "",
        },
      },
    ],
  },
});

exports.loadStatic = () => ({
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        { from: "./public/_redirects", to: "./_redirects" },
        { from: "./public/web.config", to: "./web.config" },
      ],
    }),
  ],
});

exports.loadEnv = (url) => ({
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        API_URL: JSON.stringify(url),
        REACT_APP_ENV_NAME: JSON.stringify(process.env.REACT_APP_ENV_NAME),
      },
    }),
  ],
});
