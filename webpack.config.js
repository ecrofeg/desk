const moduleName = 'desk';
const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const isDevMode = process.env.NODE_ENV === 'dev';

const extractSass = new ExtractTextPlugin({
	filename: `${moduleName}.css`
});

const config = {
	context: __dirname,
	entry: {
		desk: './src/main.tsx'
	},
	watch: isDevMode,

	watchOptions: {
		ignored: /node_modules/,
		aggregateTimeout: 300
	},

	output: {
		path: path.resolve(__dirname, 'dist/server/assets'),
		publicPath: '/dist/server/assets/',
		filename: '[name].js'
	},

	resolve: {
		modules: [
			'node_modules',
			path.resolve(__dirname, 'src'),
			path.resolve(__dirname, 'dist')
		],
		extensions: ['.ts', '.js', '.json', '.jsx', '.tsx', '.css', '.scss']
	},

	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: 'ts-loader',
				exclude: /node_modules/
			},
			{
				test: /\.scss$/,
				include: [
					path.resolve(__dirname, 'src/css')
				],
				use: extractSass.extract({
					use: [
						{
							loader: 'css-loader',
							options: {
								minimize: !isDevMode
							}
						},
						'resolve-url-loader',
						'postcss-loader',
						'sass-loader'
					],
					fallback: 'style-loader',
					publicPath: path.resolve(__dirname, 'dist')
				})
			}
		]
	},

	plugins: [
		extractSass,
		new webpack.NoEmitOnErrorsPlugin()
	]
};

config.plugins.push(
	new webpack.DefinePlugin({
		'process.env': {
			NODE_ENV: JSON.stringify(isDevMode ? 'development' : 'production')
		}
	})
);

module.exports = config;
