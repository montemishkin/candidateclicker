// third party imports
import express from 'express'
import bodyParser from 'body-parser'
// local imports
import db from 'db'
import createRetry from 'util/createRetry'


const server = express()
const jsonParser = bodyParser.json()


server.all('/poll', (req, res) => {
    createRetry({
        errorMessage: 'Error fetching candidates from db: ',
        // TODO: improve error handling
        handleRepeatedError: () => res.json({}),
        createPromise: () => db.models.candidate.all(),
        handleResolve: (candidates) => {
            res.json(candidates.reduce((state, candidate) => {
                return {
                    ...state,
                    [candidate.name]: candidate.clicks,
                }
            }, {}))
        },
    })()
})


server.post('/increment', jsonParser, (req, res) => {
    createRetry({
        errorMessage: 'Error fetching candidates from db: ',
        // TODO: improve error handling
        handleRepeatedError: () => res.json({}),
        createPromise: () => db.models.candidate
            .find({where: {name: req.body.name}})
            .then(candidate => candidate
                ? candidate.update({clicks: candidate.clicks + 1})
                : Promise.resolve([])
            ),
        handleResolve: candidates => {
            res.json(candidates.reduce((state, candidate) => {
                return {
                    ...state,
                    [candidate.name]: candidate.clicks,
                }
            }, {}))
        },
    })()
})


export default server
