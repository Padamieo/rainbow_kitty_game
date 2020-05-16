const webpack = require('webpack');
const Merge = require('webpack-merge');
const CommonConfig = require('./webpack.common.js');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = Merge(CommonConfig, {
	optimization: {
		usedExports: true,
		minimizer: [
			new TerserPlugin({
				parallel: true,
				sourceMap: true,
			}),
			new UglifyJsPlugin({
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
			}),
			new OptimizeCSSAssetsPlugin({}), //not sure this is opermizing
		],
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
	]
});
