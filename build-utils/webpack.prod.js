/* Config for Production build */

const glob = require('glob');
const webpack = require("webpack");
const commonPaths = require("./common-paths");
const PurifyCSSPlugin = require('purifycss-webpack');
const CleanWebpackPlugin = require("clean-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const BabelWebpackPlugin = require('babel-minify-webpack-plugin');

// the path(s) that should be cleaned
const pathsToClean = ["dist"];

// the clean options to use
const cleanOptions = {
	root: commonPaths.cleanPath,
	//exclude: ["*.html"],
	verbose: true,
	dry: false
};

const config = {
	// Production Sourcemaps
	/*
    * Using `cheap-*` sourcemaps because other sourcemaps are not working.
    * Prefer 'source-map' when possible.
	*/
    devtool: 'cheap-source-map',
	module: {
		rules: [
			// Loading HTML
			{
				test: /\.html$/,
				loader: "html-loader" // loaders: ['html-loader'] is also perfectly acceptable.
			},
			// Loading CSS
			{
				test: /\.css$/,
				use: ExtractTextPlugin.extract({
					use: [
						{
							loader: 'css-loader',
							options: {
								sourceMap: true,
								importLoaders: 1
							}
						},
						{
							loader: 'postcss-loader',
							options: {
								sourceMap: true
							}
					  }
					],
					fallback: "style-loader"
				})
			},
			// Loading Images
			{
				test: /\.(png|svg|jpg|gif)$/,
				use: [
					{
            loader: "file-loader",
            options: {
							name: 'assets/images/[name].[hash].[ext]',
							//outputPath: "/images/",
						},
					},
					// Image Minification
					{
						loader: 'image-webpack-loader',
						options: {
							gifsicle: {
								interlaced: false,
							},
							optipng: {
								optimizationLevel: 7,
							},
							pngquant: {
								quality: '65-90',
								speed: 4
							},
							mozjpeg: {
								progressive: true,
								quality: 65
							},
							// Specifying webp here will create a WEBP version of your JPG/PNG images
							webp: {
								quality: 75
							}
						}
					}
				 ]
			},
			// Loading Fonts
			{
			  test: /\.(woff|woff2|eot|ttf|otf)$/,
			  use: [
					{
            loader: "file-loader",
            options: {
							name: 'assets/fonts/[name].[hash].[ext]',
						},
					},
					]
			},
			// Loading Babel
			{
				test: /\.js$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: "babel-loader",
				}
			}
		]
	},
	plugins: [
		//  Make your HTML hot reload using DefinePlugin & html-loader
		new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
		new CleanWebpackPlugin(pathsToClean, cleanOptions),
		new ExtractTextPlugin("styles/[name].[contenthash].css"),
	  // Make sure this is after ExtractTextPlugin!
		new PurifyCSSPlugin({
			// Give paths to parse for rules. These should be absolute!
			paths: glob.sync(commonPaths.indexHtmlPath),
			minimize: true,
		}),
		new BabelWebpackPlugin(),
		new webpack.optimize.ModuleConcatenationPlugin(),
		new CompressionPlugin({
			asset: "[path].gz[query]",
			algorithm: "gzip",
			test: /\.(js|html|css)$/,
			threshold: 10240,
			minRatio: 0.8
		})
	]
};

module.exports = config;
