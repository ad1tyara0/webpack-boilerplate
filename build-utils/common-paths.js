/* List of path(s) used in webpack config files. */ 

const path = require("path");

module.exports = {
	outputPath: path.resolve(__dirname, "../", "dist"),
	// clean-webpack-plugin: Path to clean before rebuild
	cleanPath: path.join(__dirname, ".."),
	// html-webpack-plugin 'template' path(s) && UnusedCSS plugin path
	indexHtmlPath: path.join(__dirname, "../src/", "index.html"),
	aboutHtmlPath: path.join(__dirname, "../src/", "about.html"),
};
