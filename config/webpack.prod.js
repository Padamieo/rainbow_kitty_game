const webpack = require('webpack');
const Merge = require('webpack-merge');
const CommonConfig = require('./webpack.common.js');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = Merge(CommonConfig, {
	optimization: {
		minimizer: [new UglifyJsPlugin({
			uglifyOptions: {
				warnings: false,
				parse: {},
				compress: {},
				mangle: true,
				output: null,
				toplevel: false,
				nameCache: null,
				ie8: false,
				keep_fnames: false,
			},
		})],
	},
	plugins: [
		new webpack.LoaderOptionsPlugin({
			minimize: true,
			debug: false
		}),
		new webpack.DefinePlugin({
			'process.env': {
				'NODE_ENV': JSON.stringify('production')
			}
		}),
		new BundleAnalyzerPlugin(),
	]
});
