// third party imports
import Sequelize from 'sequelize'
// local imports
import settings from 'config/settings'
import candidates from 'candidates'


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


db.sync().then(() => {
    candidates.forEach(candidate => {
        Candidate.findOrCreate({
            where: {
                name: candidate.name,
            },
            defaults: {
                src: candidate.src,
                height: candidate.height,
                width: candidate.width,
                clicks: 0,
            },
        })
    })
}).catch(error => {
    // TODO: improve error handling
    throw error
})


export default db
