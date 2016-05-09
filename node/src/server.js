// third party imports
import express from 'express'
import logger from 'morgan'
// local imports
import apiServer from './apiServer'
import htmlServer from './htmlServer'

const server = express()


// log requests
server.use(logger('combined'))

// handle requests
server.use('/api', apiServer)
server.use('*', htmlServer)


export default server
