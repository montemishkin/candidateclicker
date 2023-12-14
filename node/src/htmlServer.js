// third party imports
import express from 'express'
// local imports
import projectPaths from 'config/projectPaths'
import randomPermutation from 'util/randomPermutation'
import commafy from 'util/commafy'
import createRetry from 'util/createRetry'
import db from 'db'


const server = express()


server.set('view engine', 'pug')
server.set('views', './templates')


server.all('*', (req, res) => {
    createRetry({
        errorMessage: 'Error fetching candidates from db: ',
        // TODO: better error page
        handleRepeatedError: () => res.send('woops!'),
        createPromise: () => db.models.candidate.all(),
        handleResolve: (candidates) => res.render('index', {
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
        }),
    })()
})


export default server
