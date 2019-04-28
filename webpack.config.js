const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const rules = {
  typescript: {
    test: /.tsx?$/,
    loader: 'awesome-typescript-loader',
  },
  css: {
    test: /\.scss$/,
    use: [
      { loader: MiniCssExtractPlugin.loader },
      'css-loader',
      'sass-loader'
    ]
  },
  jpg: {
    test: /\.jpg$/,
    loader: 'file-loader?mimetype=image/jpeg'
  },
  mp3: {
    test: /\.mp3$/,
    loader: 'file-loader'
  },
  ico: {
    test: /\.ico$/,
    loader: 'file-loader?name=[name].[ext]'
  },
  svg: {
    test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
    loader: 'file-loader?mimetype=image/svg+xml'
  },
  woff: {
    test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
    loader: 'file-loader?mimetype=application/font-woff'
  },
  woff2: {
    test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
    loader: 'file-loader?mimetype=application/font-woff'
  },
  ttf: {
    test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
    loader: 'file-loader?mimetype=application/octet-stream'
  },
  eot: {
    test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
    loader: 'file-loader'
  }
};

const plugins = {
  css: new MiniCssExtractPlugin({
    filename: '[name].css',
    chunkFilename: '[id].css',
  }),
  html: new HtmlWebpackPlugin({
    template: path.resolve(__dirname, 'src', 'index.html')
  })
};

const root = path.resolve(__dirname, 'public');
module.exports = {
  entry: './src/index.tsx',
  output: {
    filename: 'app.js',
    path: root
  },
  devtool: 'source-map',
  module: {
    rules: [
      rules.typescript,
      rules.css,
      rules.jpg,
      rules.mp3,
      rules.ico,
      rules.svg,
      rules.woff,
      rules.woff2,
      rules.ttf,
      rules.eot
    ]
  },
  resolve: {
    extensions: [
      '.ts',
      '.tsx',
      '.js'
    ]
  },
  plugins: [
    plugins.html,
    plugins.css
  ]
}
