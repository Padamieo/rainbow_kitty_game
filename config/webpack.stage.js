const webpack = require('webpack');
const Merge = require('webpack-merge');
const ProductionConfig = require('./webpack.production.js');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = Merge(ProductionConfig, {
	plugins: [
		new webpack.LoaderOptionsPlugin({
			minimize: true,
			debug: true
		}),
		new webpack.DefinePlugin({
			'process.env': {
				'NODE_ENV': JSON.stringify('development')
			}
		}),
		new BundleAnalyzerPlugin(),
	]
});