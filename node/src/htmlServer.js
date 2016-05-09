// third party imports
import express from 'express'
// local imports
import projectPaths from 'config/projectPaths'
import randomPermutation from 'util/randomPermutation'
import commafy from 'util/commafy'
import {Candidate} from 'db'

const server = express()


server.set('view engine', 'pug')
server.set('views', './templates')


server.all('*', (req, res) => {
    Candidate.all().then(candidates => {
        res.render('index', {
            candidates: randomPermutation(
                candidates.map(candidate => {
                    return {
                        name: candidate.name,
                        src: candidate.src,
                        height: candidate.height,
                        width: candidate.width,
                        clicks: commafy(candidate.clicks),
                    }
                })
            ),
            year: (new Date()).getFullYear(),
        })
    }).catch(error => {
        // TODO
        throw error
    })
})


export default server
