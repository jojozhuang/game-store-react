import webpack from "webpack";
import path from "path";

export default {
  devtool: "eval-cheap-module-source-map",
  entry: [
    "eventsource-polyfill", // necessary for hot reloading with IE
    "webpack-hot-middleware/client?reload=true", //note that it reloads the page if hot module reloading fails.
    "./src/index"
  ],
  target: "web",
  output: {
    path: __dirname + "/dist", // Note: Physical files are only output by the production build task `npm run build`.
    publicPath: "/",
    filename: "bundle.js"
  },
  devServer: {
    contentBase: "./src"
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      "process.env": {
        API_URL: JSON.stringify("http://localhost:8080")
      }
    })
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        include: path.join(__dirname, "src"),
        exclude: /node_modules/,
        use: ["babel-loader"]
      },
      { test: /(\.css)$/, use: ["style", "css"] },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, use: ["file"] },
      { test: /\.(woff|woff2)$/, use: ["url?prefix=font/&limit=5000"] },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        use: ["url?limit=10000&mimetype=application/octet-stream"]
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        use: ["url?limit=10000&mimetype=image/svg+xml"]
      }
    ]
  }
};
