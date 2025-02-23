const { sentryWebpackPlugin } = require("@sentry/webpack-plugin");

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require("webpack");

const commonConfig = {
  entry: "./src/index.tsx",

  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env", "@babel/preset-react"],
            },
          },
          {
            loader: "ts-loader",
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: ["@tailwindcss/postcss", ["postcss-preset-env", {}]],
              },
            },
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        use: ["@svgr/webpack"],
      },
    ],
  },

  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js"],
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },

  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
    },
    port: 3000,
    open: true,
    client: {
      overlay: false,
    },
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
    new MiniCssExtractPlugin({
      filename: "bundle.css",
    }),
    new CopyPlugin({
      patterns: [
        {
          from: "public/static/**/*",
          globOptions: { ignore: ["**/index.html"], gitignore: true },
        },
      ],
    }),
  ],
  devtool: false,
};

const isDevelopment = process.env.NODE_ENV === "development";

if (isDevelopment) {
  console.log("isDevelopment");
} else {
  commonConfig.stats = "errors-only";
  commonConfig.devtool = "hidden-source-map";
  commonConfig.plugins.push(
    sentryWebpackPlugin({
      authToken: process.env.SENTRY_AUTH_TOKEN,
      org: "guychienll",
      project: "webpack-playground",
      options: {
        telemetry: false,
      },
    }),
  );
}

module.exports = commonConfig;
