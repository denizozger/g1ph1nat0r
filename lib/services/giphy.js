'use strict'

const 
	request = require('request-promise'),
	assert 	= require('assert'),
	config 	= libRequire('config');

module.exports.search = query => 
	new Promise((resolve, reject) => {
		request(getApiOptions('search', query))
			.then(body => resolve(body.pagination.count ? body.data[0].embed_url : ''))
			.catch(reject);
	});

function getApiOptions(endpoint, query, limit=1) {
	return {
	    uri: `${config.giphy.BASE_URL}/${endpoint}`,
	    qs: {
	        q: query,
	        limit: limit,
	        api_key: config.giphy.API_KEY
	    },
	    json: true
	};
};
