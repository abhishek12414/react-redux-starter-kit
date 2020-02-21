const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	mode: "development",
	devtool: 'inline-source-map',
	devServer: {
		hot: true,
		open: true,
		overlay: true,
		port: 3001,
		proxy: {
			'/api': 'http://localhost:3000'
		},
		historyApiFallback: true,
	},
	entry: './src/index.js',
	output: {
		path: path.join(__dirname, '/dist'),
		filename: '[name].js',
		publicPath: "/"
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
				test: /\.sa?css$/i,
				use: [
					'style-loader',
					{
						loader: 'css-loader',
						options: {
							sourceMap: true,
							modules: {
								localIdentName: "[name]__[local]___[hash:base64:5]",
							}
						}
					}, {
						loader: 'postcss-loader',
						options: {
							plugins: () => [
								require('autoprefixer')
							],
							sourceMap: true
						}
					}, {
						loader: 'sass-loader',
						options: {
							sassOptions: {
								includePaths: [path.resolve(__dirname, 'src')]
							},
							sourceMap: true
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
					},
				]
			},
			{
				test: /\.(svg|png|jpe?g|gif)/i,
				loader: 'file-loader',
				options: {
					name: '[name].[ext]',
					outputPath: 'images',
				},
			},
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.resolve(
				__dirname,
				"../src/index.html"
			)
		})
	]
}
