module.exports = {
  entry: {
    indexScript: "./src/js/indexScript.js",
    loginScript: "./src/js/loginScript.js",
    registerScript: "./src/js/registerScript.js",
    dashboardScript: "./src/js/dashboardScript.js"
  },
  output: {
    filename: "[name].js",
    path: __dirname + "/dist"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader",
          query: {
            presets: ["@babel/env"]
          }
        }
      }
    ]
  },
  mode: "development"
};
