// local imports
var secrets = require('./secrets')


var isProduction = process.env.NODE_ENV === 'production'


module.exports = {
    debug: !isProduction,

    db: secrets.db,
    dbUser: secrets.dbUser,
    dbPassword: secrets.dbPassword,
}
