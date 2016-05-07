// third party imports
import express from 'express'

const server = express()


/* Server-wide Middleware */


/* Routing */

server.all('*', (req, res) => {
    res.send('hi')
})


export default server
