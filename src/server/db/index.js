// third party imports
import Sequelize from 'sequelize'
// local imports
import settings from 'config/settings'
import applySchema from './schema'


const db = new Sequelize(settings.db, settings.dbUser, settings.dbPassword, {
    host: 'localhost',
    dialect: 'postgres',
})

applySchema(db)


export default db
