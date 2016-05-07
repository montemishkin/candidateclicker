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
}
