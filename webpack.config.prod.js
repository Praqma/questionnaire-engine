import path from "path";
import webpack from "webpack";

export default {
  debug: true,
  devtool: "source-map",
  noInfo: false,
  entry: [path.resolve(__dirname, "src/index")],
  target: "web",
  output: {
    path: path.resolve(__dirname, "dist"),
    publicPath: "/",
    filename: "bundle.js"
  },
  plugins: [
    new webpack.ProvidePlugin({ $: "jquery", jQuery: "jquery" }),

    // Eliminate duplicate packages when generating bundle
    new webpack.optimize.DedupePlugin(),

    // Minify JS
    new webpack.optimize.UglifyJsPlugin()
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ["babel"]
      },
      {
        test: /\.vue$/,
        loader: "vue"
      },
      {
        test: /\.css$/,
        loaders: ["style-loader", "css-loader"]
      },
      {
        test: /\.scss$/,
        loaders: ["style-loader", "css-loader", "sass-loader"],
        options: {
          includePaths: ["./src/style/main.scss"]
        }
      }
    ]
  },
  vue: {
    loaders: {
      js: "babel"
    }
  },
  resolve: {
    alias: {
      vue: "vue/dist/vue.js"
    }
  }
};
