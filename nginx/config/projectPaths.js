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
var buildDir = path.join(publicDir, 'build')
// entry points
var entry = path.join(sourceDir, 'index.js')
// built files
var cssBuild = path.join(buildDir, 'styles.css')


module.exports = {
    // directories
    rootDir: rootDir,
    sourceDir: sourceDir,
    publicDir: publicDir,
    buildDir: buildDir,
    publicStaticPath: '/static',  // TODO: shouldnt need this?
    // entry points
    entry: entry,
    // built files
    cssBuild: cssBuild,
    // globs
    testsGlob: path.join(sourceDir, '**', '_tests', 'test_*.js'),
    // configuration files
    settings: path.join(configDir, 'settings.js'),
    eslintConfig: path.join(configDir, 'eslint.json'),
    karmaConfig: path.join(configDir, 'karma.js'),
    babelConfig: path.join(configDir, 'babel.js'),
    postcssConfig: path.join(configDir, 'postcss.js'),
    webpackConfig: path.join(configDir, 'webpack.js'),
}
