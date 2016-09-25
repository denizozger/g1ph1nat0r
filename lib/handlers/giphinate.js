'use strict'

const 
	config 	= libRequire('config'),
	schemas = require('../schemas')({
  	DATABASE_URL: config.db.URL
	}),
	giphy = libRequire('services/giphy');

/**
 * @params req.params.queryText {String} Text to query giphy for
 */
module.exports = (req, res, next) => {
	let query = req.params.queryText;
  
  giphy.search(query)
  	.then(url => {
  		if (!url) next();
  		res.json({query: query, url: url});
  	})
  	.catch(next);

  // return the the gif URL, cache it for the next time the same query is used
  // return Promise.resolve({})
}
