#!/usr/bin/env node

// node imports
var process = require('process')
var fs = require('fs')
// third party imports
var del = require('del')
var mkdirp = require('mkdirp')
var webpack = require('webpack')
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
    runRequestedTaskNames(tasks, ['watch', 'run'])
}


/**
 * Watch entry point.
 */
tasks['watch'] = function () {
    var config = require(projectPaths.webpackConfig)
    config.watch = true

    webpack(config, webpackCallback)
}


/**
 * Run test suite once.
 */
tasks['test'] = function () {
    // TODO
}



/**
 * Watch tests for changes, run tests on change.
 */
tasks['tdd'] = function () {
    // TODO
}


/**
 * Build entry point for production.
 */
tasks['build-production'] = function () {
    setProductionEnvironment()

    var config = require(projectPaths.webpackConfig)

    webpack(config, webpackCallback)
}


/**
 * Remove ALL previously built files.
 */
tasks['clean'] = function () {
    del.sync(projectPaths.buildDir)
    mkdirp.sync(projectPaths.buildDir)
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
