/* Config for Development build */

const config = {
	// Development Sourcemaps
	/*
    * Using `cheap-*` sourcemaps because other sourcemaps are not working.
    * Prefer 'eval-source-map' when possible.
	*/
	devtool: "cheap-eval-source-map",
	// Loaders have to be installed using npm
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
				use: ["style-loader", "css-loader"],
			},
			
			// Loading Images
			{
				test: /\.(png|svg|jpg|gif)$/,
				use: [
					{
						loader: "url-loader",
					},
				]
			},
			// Loading Fonts
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/,
				use: [
					{						
						loader: "url-loader",
					},
					]
				},
			// Loading Babel
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
				}
			}
		]
	},
	plugins: [
	]
};

module.exports = config;
