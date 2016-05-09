// node imports
var path = require('path')
// third party imports
var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
// local imports
var projectPaths = require('./projectPaths')
var babelConfig = require(projectPaths.babelConfig)
var postcssConfig = require(projectPaths.postcssConfig)
var settings = require(projectPaths.settings)


// default to using development configuration
var devtool = 'source-map'
var plugins = [
    new ExtractTextPlugin(path.basename(projectPaths.cssBuild)),
]
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
    entry: {
        index: projectPaths.entry,
    },
    output: {
        filename: '[name].js',
        chunkFilename: 'chunk-[id].js',
        path: projectPaths.buildDir,
        publicPath: projectPaths.publicStaticPath
            + '/'
            + path.relative(projectPaths.publicDir, projectPaths.buildDir)
            + '/',
    },
    module: {
        preLoaders: [
            {
                test: /\.js$/,
                loader: 'eslint',
                include: projectPaths.sourceDir,
            }, {
                test: /\.css$/,
                loader: 'postcss',
                include: projectPaths.sourceDir,
            }
        ],
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel',
                include: projectPaths.sourceDir,
                query: babelConfig,
            }, {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('style', 'css'),
            }
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
    postcss: postcssConfig,
    plugins: plugins,
    devtool: devtool,
}
