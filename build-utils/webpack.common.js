/* Common config for both Development & Production build */

const commonPaths = require('./common-paths');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;

const config = {
  // Entry point for webpack
  entry: {
    app: ['babel-polyfill', './src/scripts/main.js', './src/styles/main.css'],
    /*vendor: ['lodash', 'vue']*/
    /*polyfills: './src/polyfills.js',*/
  },
  // There can be only one output
  output: {
    path: commonPaths.outputPath,
    chunkFilename: '[name].[chunkhash].js',
    filename: 'scripts/[name].[hash].js',
    //publicPath: "/dist",
  },
  // Webapck Dev Server
  devServer: {
    port: 9000,
    hot: true,
    inline: true,
    open: true,
    historyApiFallback: true,
    contentBase: commonPaths.outputPath,
  },
  // Plugin(s)
  plugins: [
    new webpack.ProgressPlugin(),
    new HtmlWebpackPlugin({
      title: 'Index Page',
      template: commonPaths.indexHtmlPath,
      inject: 'body',
    }),
    new HtmlWebpackPlugin({
      title: 'About Page',
      filename: 'about.html',
      template: commonPaths.aboutHtmlPath,
      inject: 'body',
    }),
    new webpack.HashedModuleIdsPlugin(),
    // new webpack.optimize.CommonsChunkPlugin({name: 'vendor'}),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
    }),
    new webpack.HotModuleReplacementPlugin(),
    new BundleAnalyzerPlugin(),
  ],
};

module.exports = config;
