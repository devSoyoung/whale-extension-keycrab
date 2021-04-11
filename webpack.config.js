const path = require('path');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
//
const CopyPlugin = require("copy-webpack-plugin");
// const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const srcPath = path.resolve(__dirname, "src");
const contentScriptPath = path.join(srcPath, "content-script");

// module.exports = {
//   entry: {
//     background: path.join(srcPath, "background/index.js"),
//     "content-script/common": path.join(contentScriptPath, "common.js"),
//     "content-script/google": path.join(contentScriptPath, "google/index.js"),
//     "content-script/naver": path.join(contentScriptPath, "naver/index.js"),
//     "sidebar-react": path.join(srcPath, "sidebar-react/index.tsx"),
//   },
//   devtool: "source-map",
//   resolve: {
//     extensions: [".ts", ".tsx", ".js"],
//   },
//   module: {
//     rules: [
//       { test: /\.tsx?$./, use: [
//           {
//             loader: 'ts-loader',
//             options: {
//               transpileOnly: true,
//             }
//           }
//         ]
//       },
//     ]
//   },
//   output: {
//     path: path.resolve(__dirname, "dist"),
//   },
//   plugins: [
//     new CleanWebpackPlugin(),
//     new CopyPlugin({
//       patterns: [
//         { from: "public" },
//         { from: "src/sidebar", to: "sidebar" },
//         { from: "src/sidebar-react", to: "sidebar-react" }
//       ],
//     }),
//     new HtmlWebpackPlugin()
//   ]
// };
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
    new CopyPlugin({
      patterns: [
        { from: "public" },
      ],
    }),
  ]
};
