const path = require('path');
const projectPaths = require('./projectPaths');
// const babelConfig = require('./babelrc');

module.exports = {
  node: {
    __dirname: false,
    __filename: false,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            // options: babelConfig,
          },
        ],
        include: projectPaths.srcDir,
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
            options: {sourceMap: true},
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[path]__[local]___[hash:base64]',
            },
          },
          {
            loader: 'postcss-loader',
            options: require('./postcss.config.js'),
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.js'],
    modules: [projectPaths.srcDir, 'node_modules'],
  },
  devtool: 'source-map',
};
