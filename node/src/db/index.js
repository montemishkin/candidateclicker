// third party imports
import Sequelize from 'sequelize'
// local imports
import settings from 'config/settings'
import candidates from 'candidates'
import createRetry from 'util/createRetry'


const db = new Sequelize(settings.db, settings.dbUser, settings.dbPassword, {
    host: settings.dbHost,
    dialect: 'postgres',
})


export const Candidate = db.define('candidate', {
    name: {
        type: Sequelize.STRING,
        unique: true,
    },
    clicks: {
        type: Sequelize.INTEGER,
    },
    src: {
        type: Sequelize.STRING,
        unique: true,
    },
    height: {
        type: Sequelize.INTEGER,
    },
    width: {
        type: Sequelize.INTEGER,
    },
})


createRetry({
    errorMessage: 'Error syncing initial data to db: ',
    createPromise: () => db.sync().then(() => Promise.all(
        candidates.map(candidate => db.models.candidate.findOrCreate({
            where: {
                name: candidate.name,
            },
            defaults: {
                src: candidate.src,
                height: candidate.height,
                width: candidate.width,
                clicks: 0,
            },
        }))
    )),
})()

export default db
