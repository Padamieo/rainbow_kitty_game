const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractSass = new ExtractTextPlugin({
	filename: '[name].[contenthash].css'
});

module.exports = {
	context: path.join(process.cwd(), 'src'), //the home directory for webpack
	devtool: 'source-map', // enhance debugging by adding meta info for the browser devtools
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
		extensions: ['.js', '.glsl'],  // extensions that are used
		modules: [path.join(process.cwd(), 'src'), 'node_modules'] // directories where to look for modules
	},
	module: {
		rules: [{
			test: /\.js$/,
			exclude: /node_modules/,
			use: {
				loader: 'babel-loader',
				options: {
					presets: ['env']
				}
			}
		},{
			test: /\.css$/,
			exclude: /node_modules/,
			use: [
				'style-loader',
				'css-loader?sourceMap',
			],
		},{
			test: /\.atlas$/,
			use: [
				{ loader: 'file-loader' },
				{ loader: 'extract-loader' },
				{ loader: 'ref-loader' },
			]
		},{
			type: 'javascript/auto',
			test: /\.(json)$/,
			exclude: /(node_modules)/,
			loader: 'file-loader',
		},{
			test: /\.(png|jp(e*)g|svg)$/,
			use: [{
				loader: 'file-loader',
				options: {
					name: 'assets/[hash]-[name].[ext]'
				}
			}]
		},
		{
			test: /\.glsl$/,
			loader: 'webpack-glsl-loader'
		}]
	},
	plugins: [
		new CleanWebpackPlugin(['dist'], {root: process.cwd()}),
		new HtmlWebpackPlugin({
			template: 'index.html'
		})
	]
};
