/**
 * Provides a single, consistent place for js files to get
 * relevant paths, globs, etc pertaining to the project structure.
 */

// node imports
var path = require('path')


// directories
var rootDir = path.join(__dirname, '..')
var configDir = path.join(rootDir, 'config')
var sourceDir = path.join(rootDir, 'src')
var publicDir = path.join(rootDir, 'public')
var buildDir = path.join(rootDir, 'build')
// entry points
var entry = path.join(sourceDir, 'index.js')


module.exports = {
    // directories
    rootDir: rootDir,
    sourceDir: sourceDir,
    publicDir: publicDir,
    templatesDir: path.join(sourceDir, 'server', 'templates'),
    buildDir: buildDir,
    publicStaticPath: '/static',
    // entry points
    entry: entry,
    // globs
    testsGlob: path.join(sourceDir, '**', '_tests', 'test_*.js'),
    // configuration files
    settings: path.join(configDir, 'settings.js'),
    eslintConfig: path.join(configDir, 'eslint.json'),
    babelConfig: path.join(configDir, 'babel.js'),
    postcssConfig: path.join(configDir, 'postcss.js'),
    webpackConfig: path.join(configDir, 'webpack.js'),
}
