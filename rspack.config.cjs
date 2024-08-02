const path = require('node:path')

module.exports = {
	entry: {
		main: './apps/back/src/index.ts',
	},
	module: {
		rules: [
			{
				test: /\.ts$/,
				exclude: [/node_modules/],
				loader: 'builtin:swc-loader',
				options: {
					jsc: {
						parser: {
							syntax: 'typescript',
						},
					},
				},
				type: 'javascript/auto',
			},
		],
	},
	resolve: {
		extensions: ['.ts', '.js', '.mjs'],
		tsConfig: {
			configFile: path.resolve(__dirname, './apps/back/tsconfig.json'),
			references: 'auto',
		},
	},
	output: {
		filename: 'index.mjs',
		path: `${__dirname}/dist/apps/back`,
		chunkFormat: 'module',
	},
	devServer: {
		hot: true,
		port: 3000,
	},
	target: 'node',
	experiments: {
		outputModule: true,
	},
}
