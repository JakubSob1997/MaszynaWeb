const path = require("path");

module.exports={
  mode: "production",//production development
  entry: "./src/index.js",

  output: {
    filename: "app.js",
    path: path.resolve(__dirname, "dist")
  },
  

    
};
