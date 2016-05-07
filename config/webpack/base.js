// node imports
var path = require('path')
// third party imports
var webpack = require('webpack')
// local imports
var projectPaths = require('../projectPaths')
var babelConfig = require(projectPaths.babelConfig)
var settings = require(projectPaths.settings)


// default to using development configuration
var devtool = 'source-map'
var plugins = []
// if we are in production environment
if (!settings.debug) {
    // use production configuration instead
    devtool = ''
    plugins.push(
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production'),
        }),
        new webpack.optimize.UglifyJsPlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.DedupePlugin()
    )
}


// export webpack configuration object
module.exports = {
    output: {
        filename: '[name].js',
        chunkFilename: 'chunk-[id].js',
    },
    module: {
        preLoaders: [
            {
                test: /\.js$/,
                loader: 'eslint',
                include: projectPaths.sourceDir,
            },
        ],
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel',
                include: projectPaths.sourceDir,
                query: babelConfig,
            },
        ],
    },
    resolve: {
        extensions: ['', '.js'],
        root: [
            projectPaths.sourceDir,
            projectPaths.rootDir,
        ],
    },
    eslint: {
        configFile: projectPaths.eslintConfig,
        failOnError: true,
    },
    plugins: plugins,
    devtool: devtool,
}
