const path = require('path');

const CopyPlugin = require("copy-webpack-plugin");

const srcPath = path.resolve(__dirname, "src");
const contentScriptPath = path.join(srcPath, "content-script");

module.exports = {
  entry: {
    background: path.join(srcPath, "background/index.js"),
    "content-script/common": path.join(contentScriptPath, "common.js"),
    "content-script/google": path.join(contentScriptPath, "google/google-unified-search.js"),
    "content-script/naver": path.join(contentScriptPath, "naver/index.js")
  },
  output: {
    path: path.resolve(__dirname, "dist"),
  },
  plugins: [
    new CopyPlugin({
      patterns: [{ from: "public" }],
    }),
  ]
};