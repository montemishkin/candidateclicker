import express from 'express'
// TODO: can i use this even outside creating the server?
import logger from 'morgan'

import {apiServer} from 'src/exes/webServer/apiServer'
import {htmlServer} from 'src/exes/webServer/htmlServer'

const server = express()
server.use(logger('combined'))
server.use('/api', apiServer)
server.use('*', htmlServer)

export server
