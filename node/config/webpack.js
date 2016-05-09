// node imports
var path = require('path')
var fs = require('fs')
// third party imports
var webpack = require('webpack')
var assign = require('lodash/assign')
// local imports
var projectPaths = require('./projectPaths')
var babelConfig = require(projectPaths.babelConfig)
var settings = require(projectPaths.settings)


// default to using development configuration
var devtool = 'source-map'
var plugins = []
if (settings.debug) {
    // add source map support
    plugins.push(
        new webpack.BannerPlugin(
            'require("source-map-support").install();',
            {raw: true, entryOnly: false}
        )
    )
} else {
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


// dict of node modules to treat as externals
// reference: http://jlongster.com/Backend-Apps-with-Webpack--Part-I
var nodeModules = fs.readdirSync('node_modules')
    // filter out the .bin dir
    .filter(function (dir) {
        return dir !== '.bin'
    })
    // create the data structure desired by webpack
    .reduce(function (state, dir) {
        var dummy = {}
        dummy[dir] = 'commonjs ' + dir

        return assign({}, state, dummy)
    }, {})


// export webpack configuration object
module.exports = {
    entry: {
        index: projectPaths.entry,
    },
    output: {
        filename: '[name].js',
        chunkFilename: 'chunk-[id].js',
        path: projectPaths.buildDir,
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
    target: 'node',
    // don't bundle node modules
    externals: nodeModules,
    plugins: plugins,
    node: {
        console: true,
        global: true,
        process: true,
        Buffer: true,
        __dirname: true,
        __filename: true,
        path: true,
    },
    plugins: plugins,
    devtool: devtool,
}
