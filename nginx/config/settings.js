var isProduction = process.env.NODE_ENV === 'production'


module.exports = {
    debug: !isProduction,
    gaPropertyId: isProduction
        ? 'UA-68929870-5'
        : '',
    fbAppId: isProduction
        ? '238260666543017'
        : '',
}
