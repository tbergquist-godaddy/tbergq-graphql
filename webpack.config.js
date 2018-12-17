// @flow

const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  mode: 'none',
  target: 'node',
  optimization: {
    nodeEnv: false,
    namedModules: true,
    namedChunks: true,
    minimizer: [new UglifyJsPlugin()],
  },
  externals: ['pg', 'tedious', 'pg-hstore'],
  entry: {
    index: './src/index.js',
  },
  output: {
    path: path.resolve(__dirname, 'graphql'),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        // see: https://github.com/apollographql/react-apollo/issues/1737
        test: /\.mjs$/,
        type: 'javascript/auto',
        use: [],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            babelrc: true,
          },
        },
      },
    ],
  },
};
