import ExtractTextPlugin from 'extract-text-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import path from 'path'

const extractTextPlugin = new ExtractTextPlugin({
  filename: 'app.css',
  allChunks: true
})

const htmlPlugin = new HtmlWebpackPlugin({
  template: path.resolve(__dirname, 'src', 'index.html')
})

export default {
  entry: './src/index.js',
  devtool: 'source-map',
  output: { filename: 'app.js', path: path.resolve(__dirname, 'public') },
  devServer: { contentBase: path.resolve(__dirname, 'public'), compress: true, port: 8080 },
  module: {
    loaders: [{
      test: /.jsx?$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
      query: { presets: ['env', 'react'] }},
    {test: /\.jpg$/, loader: 'file-loader?mimetype=image/jpeg'},
    {test: /\.mp3$/, loader: 'file-loader'},
    {test: /\.scss$/, loader: ExtractTextPlugin.extract('css-loader!sass-loader')},
    {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'file-loader?mimetype=image/svg+xml'},
    {test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: 'file-loader?mimetype=application/font-woff'},
    {test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: 'file-loader?mimetype=application/font-woff'},
    {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'file-loader?mimetype=application/octet-stream'},
    {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file-loader'}]
  },
  resolve: { extensions: ['.js', '.jsx'] },
  plugins: [extractTextPlugin, htmlPlugin]
}
