import path from 'path';
import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'

export default {
  debug : true,
  devtool : 'inline-source-map',
  noInfo : false,
  entry : [path.resolve(__dirname, 'src/index')],
  target : 'web',
  output : {
    path: path.resolve(__dirname, 'src'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  plugins : [
    new webpack.ProvidePlugin({$: "jquery", jQuery: "jquery"}),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      inject: true
    }),

    // Define environment variables
    new webpack.DefinePlugin({
      'process.env': {
        "BACKEND_URL": JSON.stringify('')
      }
    })
  ],
  module : {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ['babel']
      }, {
        test: /\.vue$/,
        loader: 'vue'
      }, {
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader']
      }, {
        test: /\.scss$/,
        loaders: [
          'style-loader', 'css-loader', 'sass-loader'
        ],
        options: {
          includePaths: ["./src/style/main.scss"]
        }
      }
    ]
  },
  vue : {
    loaders: {
      js: 'babel'
    }
  },
  resolve: {
    alias: {
      vue: 'vue/dist/vue.js'
    }
  }
};
