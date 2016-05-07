// third party imports
import express from 'express'
import compression from 'compression'
import logger from 'morgan'
import favicon from 'serve-favicon'
import serveStatic from 'serve-static'
// local imports
import projectPaths from 'config/projectPaths'
import settings from 'config/settings'
import apiServer from './apiServer'
import htmlServer from './htmlServer'

const server = express()


/* Server-wide Middleware */

// compress responses
server.use(compression())
// log requests
server.use(logger(settings.expressLogStyle))
// serve favicon
server.use(favicon(projectPaths.favicon))
server.set('view engine', 'pug')
server.set('views', './templates')


/* Routing */

// route static files to public dir
server.use(projectPaths.publicStaticPath, serveStatic(projectPaths.publicDir))

server.all('/api', apiServer)
server.all('*', htmlServer)


export default server
