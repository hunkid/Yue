var CopyWebpackPlugin = require('copy-webpack-plugin')
var path = require('path')
module.exports = {
  devtool: 'source-map',
  entry: {
    index: './src/index.js',
    example: './example/index.js'
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'eslint-loader',
      },
      {
        test: /\.js$/,
        include: /src/,
        exclude: /node_modules/,
        use: 'babel-loader',
      }
    ]
  },
  plugins: [
    new CopyWebpackPlugin([{
      from: './example/index.html'
    }], {})
  ]
}
