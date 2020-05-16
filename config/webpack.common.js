const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
	context: path.join(process.cwd(), 'src'),
	devtool: 'source-map',
	entry: {
		app: './index.js'
	},
	output: {
		path: path.join(process.cwd(), 'dist'),
		filename: '[name].[hash].js',
		publicPath: '/',
		sourceMapFilename: '[name].map'
	},
	resolve: {
		extensions: ['.js'],
		modules: [
			path.join(process.cwd(), 'src'),
			'node_modules'
		],
		symlinks: false,
		alias: {
			react: 'preact/compat',
			'react-dom': 'preact/compat',
		},
	},
	module: {
		rules: [{
			test: /\.js$/,
			exclude: /node_modules/,
			use: {
				loader: 'babel-loader',
			}
		},{
			test: /\.css$/,
			exclude: /node_modules/,
			use: [
				'style-loader',
				'css-loader',
			],
			sideEffects: true,
		},{
			test: [ /\.vert$/, /\.frag$/ ],
			use: 'raw-loader'
		},{
			test: /\.(png|jp(e*)g|svg)$/,
			use: [{
				loader: 'file-loader',
				options: {
					name: 'assets/[hash]-[name].[ext]'
				}
			}]
		}]
	},
	plugins: [
		new CleanWebpackPlugin(['dist'], {root: process.cwd()}),
		new HtmlWebpackPlugin({
			template: 'index.html'
		})
	]
};
