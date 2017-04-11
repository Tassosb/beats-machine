const path = require('path');

module.exports = {
  entry: './frontend/beat_machine.js',
  output: {
    path: __dirname + '/app/assets/javascripts/',
    filename: 'bundle.js',
  },
  module: {
    loaders: [
      {
        test: [/\.jsx?$/, /\.js?$/],
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['*', '.js', '.jsx' ]
  }
};
