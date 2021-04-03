const path = require('path');

const CopyPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const srcPath = path.resolve(__dirname, "src");
const contentScriptPath = path.join(srcPath, "content-script");

module.exports = {
  entry: {
    background: path.join(srcPath, "background/index.js"),
    "content-script/common": path.join(contentScriptPath, "common.js"),
    "content-script/google": path.join(contentScriptPath, "google/index.js"),
    "content-script/naver": path.join(contentScriptPath, "naver/index.js")
  },
  output: {
    path: path.resolve(__dirname, "dist"),
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyPlugin({
      patterns: [
        { from: "public" },
        { from: "src/sidebar", to: "sidebar" }
      ],
    }),
  ]
};