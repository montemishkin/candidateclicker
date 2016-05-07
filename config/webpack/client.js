// node imports
var path = require('path')
// third party imports
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var assign = require('lodash/object/assign')
// local imports
var projectPaths = require('../projectPaths')
var baseConfig = require(projectPaths.webpackBaseConfig)
var postcssConfig = require(projectPaths.postcssConfig)


module.exports = assign({}, baseConfig, {
    entry: {
        client: projectPaths.clientEntry,
    },
    output: assign({}, baseConfig.output, {
        path: projectPaths.publicBuildDir,
        publicPath: projectPaths.publicStaticPath
            + '/'
            + path.relative(projectPaths.publicDir, projectPaths.publicBuildDir)
            + '/',
    }),
    plugins: baseConfig.plugins.concat(
        new ExtractTextPlugin(path.basename(projectPaths.cssBuild))
    ),
    module: assign({}, baseConfig.module, {
        preLoaders: baseConfig.module.preLoaders.concat(
            {
                test: /\.css$/,
                loader: 'postcss',
                include: projectPaths.sourceDir,
            }
        ),
        loaders: baseConfig.module.loaders.concat(
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('style', 'css'),
            }
        ),
    }),
    postcss: postcssConfig,
})
