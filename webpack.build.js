const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports={
  mode: "production",//production development
  entry: "./src/index.js",

  output: {
    filename: "app.js",
    path: path.resolve(__dirname, "dist")
  },
  
  
    
};
