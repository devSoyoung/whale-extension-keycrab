const path = require('path');

const CopyPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ExtensionReloader  = require('webpack-extension-reloader');

const srcPath = path.resolve(__dirname, "src");
const contentScriptPath = path.join(srcPath, "content-script");
const distPath = path.resolve(__dirname, "dist");

module.exports = {
  entry: {
    background: path.join(srcPath, "background/index.js"),
    "content-script/common": path.join(contentScriptPath, "common.js"),
    "content-script/google": path.join(contentScriptPath, "google/index.js"),
    "content-script/naver": path.join(contentScriptPath, "naver/index.js"),
    "sidebar-react": path.join(srcPath, "sidebar-react/index.tsx"),
  },
  output: {
    path: path.join(__dirname, "dist"),
    filename: "[name].js",
  },
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.tsx?$/,
        use: "ts-loader",
      },
      {
        exclude: /node_modules/,
        test: /\.scss$/,
        use: [
          {
            loader: "style-loader", // Creates style nodes from JS strings
          },
          {
            loader: "css-loader", // Translates CSS into CommonJS
          },
          {
            loader: "sass-loader", // Compiles Sass to CSS
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
    alias: {
      "@src": path.resolve(__dirname, "src/"),
    },
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyPlugin({
      patterns: [
        { from: "public" },
      ],
    }),
    new ExtensionReloader({
      reloadPage: true,
      entries: {
        contentScript: [
          "content-script/common",
          "content-script/google",
          "content-script/naver"
        ],
        background: 'background',
        extensionPage: 'sidebar-react',
      }
    })
  ]
};
