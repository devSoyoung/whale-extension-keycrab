const path = require('path');

const srcPath = path.resolve(__dirname, "src");

module.exports = {
  entry: {
    background: path.join(srcPath, "background/index.js")
  },
  output: {
    path: path.resolve(__dirname, "dist"),
  },
};