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
var privateBuildDir = path.join(rootDir, 'build')
var publicBuildDir = path.join(publicDir, 'build')
var webpackDir = path.join(configDir, 'webpack')
// entry points
var clientEntry = path.join(sourceDir, 'client', 'index.js')
var serverEntry = path.join(sourceDir, 'server', 'index.js')
// built files
var serverBuild = path.join(privateBuildDir, 'server.js')
var cssBuild = path.join(publicBuildDir, 'styles.css')


module.exports = {
    // directories
    rootDir: rootDir,
    sourceDir: sourceDir,
    publicDir: publicDir,
    templatesDir: path.join(sourceDir, 'server', 'templates'),
    privateBuildDir: privateBuildDir,
    publicBuildDir: publicBuildDir,
    publicStaticPath: '/static',
    // entry points
    clientEntry: clientEntry,
    serverEntry: serverEntry,
    // built files
    serverBuild: serverBuild,
    cssBuild: cssBuild,
    // globs
    testsGlob: path.join(sourceDir, '**', '_tests', 'test_*.js'),
    // configuration files
    settings: path.join(configDir, 'settings.js'),
    eslintConfig: path.join(configDir, 'eslint.json'),
    karmaConfig: path.join(configDir, 'karma.js'),
    babelConfig: path.join(configDir, 'babel.js'),
    postcssConfig: path.join(configDir, 'postcss.js'),
    webpackBaseConfig: path.join(webpackDir, 'base.js'),
    webpackClientConfig: path.join(webpackDir, 'client.js'),
    webpackServerConfig: path.join(webpackDir, 'server.js'),
    // favicon
    favicon: path.join(publicDir, 'images', 'favicon.png')
}
