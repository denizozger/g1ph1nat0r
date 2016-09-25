'use strict'

const schemas = require('../schemas')({
    DATABASE_URL: process.env.DATABASE_URL
})

/**
 * @params req.params.queryText {String} Text to query giphy for
 */
module.exports = (req, res) => {
    // call to the giphy API using the `req.params.queryText` string

    // return the the gif URL, cache it for the next time the same query is used
    // return Promise.resolve({})
    return res.send('ok');
}
