#!/usr/bin/env node

// node imports
var process = require('process')
var fs = require('fs')
// third party imports
var del = require('del')
var mkdirp = require('mkdirp')
var karma = require('karma')
var webpack = require('webpack')
var nodemon = require('nodemon')
// local imports
var projectPaths = require('./config/projectPaths')


function webpackCallback(error, stats) {
    console.log(stats.toString({
        chunks: false,
        colors: true,
    }))

    // log errors below so that you see them
    if (error) {
        console.log('Webpack error: ', error)
    }
}


function setProductionEnvironment() {
    process.env.NODE_ENV = 'production'
}


var tasks = {}


/**
 * Default to watching client and server, and runing server.
 */
tasks['default'] = function () {
    runRequestedTaskNames(tasks, [
        'clean',
        'watch-client',
        'watch-server',
        'run-server'
    ])
}


/**
 * Build everything needed for production.
 */
tasks['build-production'] = function () {
    runRequestedTaskNames(tasks, [
        'clean',
        'build-client-production',
        'build-server-production',
    ])
}


/**
 * Run the development server.
 */
tasks['run-server'] = function () {
    nodemon({
        script: projectPaths.serverBuild,
        watch: projectPaths.serverBuild,
        args: ['8000'],
    })
}


/**
 * Watch client entry point.
 */
tasks['watch-client'] = function () {
    var config = require(projectPaths.webpackClientConfig)
    config.watch = true

    webpack(config, webpackCallback)
}


/**
 * Watch server entry point.
 */
tasks['watch-server'] = function () {
    var config = require(projectPaths.webpackServerConfig)
    config.watch = true

    webpack(config, webpackCallback)
}


/**
 * Run test suite once.
 */
tasks['test'] = function () {
    var server = new karma.Server({
        configFile: projectPaths.karmaConfig,
        singleRun: true
    })

    server.start()
}



/**
 * Watch tests for changes, run tests on change.
 */
tasks['tdd'] = function () {
    var server = new karma.Server({
        configFile: projectPaths.karmaConfig,
    })

    server.start()
}


/**
 * Build client entry point for production.
 */
tasks['build-client-production'] = function () {
    setProductionEnvironment()

    var config = require(projectPaths.webpackClientConfig)

    webpack(config, webpackCallback)
}


/**
 * Build server entry point for production.
 */
tasks['build-server-production'] = function () {
    setProductionEnvironment()

    var config = require(projectPaths.webpackServerConfig)

    webpack(config, webpackCallback)
}


/**
 * Remove ALL previously built files.
 */
tasks['clean'] = function () {
    del.sync([
        projectPaths.privateBuildDir,
        projectPaths.publicBuildDir,
    ])
    mkdirp.sync(projectPaths.privateBuildDir)
    mkdirp.sync(projectPaths.publicBuildDir)
}




runRequestedTaskNames(tasks, process.argv.slice(2))


function runRequestedTaskNames(tasksObject, names) {
    console.log('Requested tasks: ', names.join(', '))

    if (names.length === 0) {
        names.push('default')
    }

    names.forEach(function (name) {
        var task = tasksObject[name]

        if (typeof task === 'undefined') {
            console.log('No such task: ', name)
            return
        }

        console.log('Running task: ', name)
        task()
        console.log('Completed task: ', name)
    })
}
