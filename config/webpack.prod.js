const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin').CleanWebpackPlugin;
const HtmlCriticalWebpackPlugin = require("html-critical-webpack-plugin");

module.exports = (env) => {
	return {
		mode: "production",
		devtool: env && env['sourceMap'] ? "source-map" : "nosource-source-map",
		entry: ['@babel/polyfill', './src/index.js'],
		output: {
			path: path.join(__dirname, '../dist'),
			filename: '[name].[contentHash].js',
			publicPath: '/'
		},
		optimization: {
			minimizer: [
				new UglifyJsPlugin({
					cache: true,
					parallel: true,
					sourceMap: env && env['sourceMap'] ? true : false
				}),
				new OptimizeCSSAssetsPlugin({})
			]
		},
		resolve: {
			alias: {
				src: path.resolve(__dirname, '../src')
			}
		},
		module: {
			rules: [
				{
					test: /\.js$/,
					exclude: /node_modules/,
					use: {
						loader: 'babel-loader'
					}
				},
				{
					test: /(\.css|\.scss|\.sass)$/,
					use: [
						MiniCssExtractPlugin.loader,
						{
							loader: 'css-loader',
							options: {
								sourceMap: false,
								modules: {
									localIdentName: "[hash:base64:5]",
								}
							}
						}, {
							loader: 'postcss-loader',
							options: {
								plugins: () => [
									require('autoprefixer')
								],
								sourceMap: false
							}
						}, {
							loader: 'sass-loader',
							options: {
								sassOptions: {
									includePaths: [path.resolve(__dirname, 'src')]
								},
								sourceMap: false
							}
						},
						{
							loader: "sass-resources-loader",
							options: {
								resources: [
									path.resolve(
										__dirname,
										"../src/sass/index.scss"
									)
								]
							}
						}
					]
				},
				{
					test: /\.(svg|png|jpe?g|gif)/i,
					loader: 'file-loader',
					options: {
						name: '[name].[ext]',
						outputPath: 'images',
					},
				}
			]
		},
		plugins: [
			new CleanWebpackPlugin(),
			new MiniCssExtractPlugin(),
			new HtmlWebpackPlugin({
				template: path.resolve(
					__dirname,
					"../src/index.html"
				),
				minify: {
					removeComments: true,
					collapseWhitespace: true
				},
				inject: true
			}),
			new HtmlCriticalWebpackPlugin({
				base: path.resolve(__dirname, '../dist'),
				src: 'index.html',
				dest: 'index.html',
				inline: true,
				minify: true,
				extract: true,
				width: 1366,
				height: 768,
				penthouse: {
					blockJSRequests: false,
				}
			})
		]
	}
}
