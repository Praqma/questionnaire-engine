const path = require("path")
const webpack = require("webpack")
const HtmlWebpackPlugin = require('html-webpack-plugin')
const WebpackMd5Hash = require('webpack-md5-hash')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  debug: true,
  devtool: "source-map",
  noInfo: false,
  entry: {
    vendor: path.resolve(__dirname, 'src/vendor'),
    main: path.resolve(__dirname, "src/index")
  },
  target: "web",
  output: {
    path: path.resolve(__dirname, "dist"),
    publicPath: "/",
    filename: "[name].[chunkhash].js"
  },
  plugins: [
    // Define environment variables
    // enable env variable for backendUrl if backend is separated into different project
    // new webpack.DefinePlugin({
    //   'process.env': {
    //     "BACKEND_URL": JSON.stringify('http://praqma-formsapp.dhqhgmey3m.eu-west-1.elasticbeanstalk.com')
    //   }
    // }),

    new webpack.ProvidePlugin({ $: "jquery", jQuery: "jquery" }),

    // Generate an external css file with a hash in the filename
    new ExtractTextPlugin('[name].[contenthash].css'),

    // Hash the files using MD5 so that their names chhange when the content changes.
    new WebpackMd5Hash(),

    // Use CommonsChunkPlugin to create a separate bundle
    // of vendor libraries so that they're cached separately.
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor'
    }),

    // Create HTML file that includes reference to bundled JS.
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      },
      inject: true
    }),

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
        loader: ExtractTextPlugin.extract('css?sourceMap')
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
