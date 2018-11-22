const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: {
    loginScript: "./src/scripts/loginScript.js",
    registerScript: "./src/scripts/registerScript.js"
  },
  output: {
    filename: "[name].js",
    path: __dirname + "/dist"
  },
  plugins: [new HtmlWebpackPlugin()],
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader",
          query: {
            presets: ["env"]
          }
        }
      }
    ]
  }
};
