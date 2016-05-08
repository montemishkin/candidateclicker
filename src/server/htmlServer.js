// third party imports
import express from 'express'
// local imports
import projectPaths from 'config/projectPaths'
import randomPermutation from 'util/randomPermutation'
import commafy from 'util/commafy'
import candidates from './candidates'

const server = express()


/* Server-wide Middleware */

server.set('view engine', 'pug')
server.set('views', projectPaths.templatesDir)


/* Routing */

server.all('*', (req, res) => {
    res.render('index', {
        candidates: randomPermutation(candidates)
            .map(candidate => {
                return {
                    ...candidate,
                    clicks: commafy(candidate.clicks),
                }
            }),
        year: (new Date()).getFullYear(),
    })
})


export default server
