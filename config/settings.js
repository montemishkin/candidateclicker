// local imports
var secrets = require('./secrets')


var isProduction = process.env.NODE_ENV === 'production'


module.exports = {
    debug: !isProduction,
    expressLogStyle: isProduction
        ? 'combined'
        : 'dev',
        // TODO: get one of these
    gaPropertyId: isProduction
        ? ''
        : '',

    db: secrets.db,
    dbUser: secrets.dbUser,
    dbPassword: secrets.dbPassword,
}
