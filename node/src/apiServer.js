// third party imports
import express from 'express'
import bodyParser from 'body-parser'
// local imports
import {Candidate} from 'db'


const server = express()
const jsonParser = bodyParser.json()


server.all('/poll', (req, res) => {
    Candidate.all().then(candidates => {
        res.json(candidates.reduce((state, candidate) => {
            return {
                ...state,
                [candidate.name]: candidate.clicks,
            }
        }, {}))
    }).catch(error => {
        // TODO: handle this
        throw error
    })
})


server.post('/increment', jsonParser, (req, res) => {
    Candidate.find({where: {name: req.body.name}})
        .then(candidate => {
            if (candidate) {
                candidate.update({clicks: candidate.clicks + 1})
            }
        })
        .then(() => Candidate.all())
        .then(candidates => {
            res.json(candidates.reduce((state, candidate) => {
                return {
                    ...state,
                    [candidate.name]: candidate.clicks,
                }
            }, {}))
        }).catch(error => {
            // TODO: handle this
            throw error
        })
})


export default server
