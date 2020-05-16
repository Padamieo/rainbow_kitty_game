const webpack = require('webpack');
const path = require('path');
const Merge = require('webpack-merge');
const CommonConfig = require('./webpack.common.js');
const fs = require("fs");

module.exports = Merge(CommonConfig, {
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.DefinePlugin({
			'process.env': {
				'NODE_ENV': JSON.stringify('production')
			}
		}),
	],
	devServer: {
		https: {
			key: fs.readFileSync('./ssl/server.key'),
			cert: fs.readFileSync('./ssl/server.crt')
		},
		host: '0.0.0.0',
		disableHostCheck: true,
		publicPath: '/',
		port: 8000,
		contentBase: path.join(process.cwd(), 'dist'),
		historyApiFallback: true,
		noInfo: false,
		stats: 'minimal',
		inline:true,
		hot: true,
	}
});
