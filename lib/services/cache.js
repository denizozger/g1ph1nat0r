'use strict'

const 
	config = require('../config'),
	schemas = require('../schemas')({
		DATABASE_URL: config.db.URL
	});

const cache = module.exports = {

	/**
	 * @params query {String} as the key, url {String} as the value
	 * @return {Giphy} object
	 */
	set: (query, url) => {
		let params = {
	    url: url,
	    query: String(query),
	    createdAt: new Date()
		};

		return new Promise((resolve, reject) => {
			schemas.Giphys
				.create(params)
				.then(resolve)
				.catch(reject);
		})
	},

	/**
	 * @params query {String} key to retrieve
	 * @return {Giphy} object
	 */
	get: query => {
		let params = { 
			where: {
				query: String(query)
			} 
		};

		return new Promise((resolve, reject) => {
			schemas.Giphys
				.findOne(params)
				.then(resolve)
				.catch(reject);
		})
	},

	/**
	 * @params query {String} key to delete
	 * @return {Number} 0 if key wasn't found, 1 if if was found & deleted
	 */
	delete: query => {
		let params = { 
			where: {
				query: String(query)
			} 
		};

		return new Promise((resolve, reject) => {
			schemas.Giphys
				.destroy(params)
				.then(resolve)
				.catch(reject);
		})
	}

};
