const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports={
  mode: "development",//production development
  entry: "./src/index.js",

  output: {
    filename: "app.js",
    path: path.resolve(__dirname, "dist")
  },
  
  stats: {warnings:false},
  performance: {
    hints: false
  }
};
