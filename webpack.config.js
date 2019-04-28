const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

const css =  new MiniCssExtractPlugin({
  filename: '[name].css',
  chunkFilename: '[id].css',
})

const htmlPlugin = new HtmlWebpackPlugin({
  template: path.resolve(__dirname, 'src', 'index.html')
})

const root = path.resolve(__dirname, 'public')

module.exports = {
  entry: './src/index.tsx',
  output: { filename: 'app.js', path: root },
  devtool: 'source-map',
  devServer: { contentBase: root, compress: true, port: 8080 },
  module: {
    rules: [
      {test: /.tsx?$/, loader: 'awesome-typescript-loader', exclude: /node_modules/},
      {test: /\.jpg$/, loader: 'file-loader?mimetype=image/jpeg'},
      {test: /\.mp3$/, loader: 'file-loader'},
      {test: /\.ico$/, loader: 'file-loader?name=[name].[ext]'},
      {
        test: /\.scss$/,
        use: [{loader: MiniCssExtractPlugin.loader}, 'css-loader', 'sass-loader']
      },
      {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'file-loader?mimetype=image/svg+xml'},
      {test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: 'file-loader?mimetype=application/font-woff'},
      {test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: 'file-loader?mimetype=application/font-woff'},
      {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'file-loader?mimetype=application/octet-stream'},
      {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file-loader'},
    ]
  },
  resolve: { extensions: ['.ts', '.tsx', '.js'] },
  plugins: [css, htmlPlugin]
}
