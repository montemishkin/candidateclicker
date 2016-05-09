var isProduction = process.env.NODE_ENV === 'production'


module.exports = {
    debug: !isProduction,
    // TODO: get one of these
    gaPropertyId: isProduction
        ? ''
        : '',
}
