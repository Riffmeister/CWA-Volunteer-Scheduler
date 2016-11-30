var path = require('path');

var APP_DIR = path.resolve(__dirname, 'src/app')
var BUILD_DIR = path.resolve(__dirname, 'src')


var config = {
  entry: `${APP_DIR}/index.js`,
  output: {
	  path: BUILD_DIR,
	  filename: 'bundle.js' },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
		include : APP_DIR,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react']
        }
	},
	{
  test: /\.scss$/,
  loaders: ['style', 'css', 'sass']
}

    ]
  },
  resolve : {
	  extensions: ['', '.scss', '.js']
  }
}

module.exports = config
