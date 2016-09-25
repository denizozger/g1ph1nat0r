'use strict'

function Config() {

	this.giphy = {
		BASE_URL: 'http://api.giphy.com/v1/gifs',
		API_KEY: process.env.GIPHY_API_KEY || 'dc6zaTOxFJmzC' // public key, so *should be* ok to hardcode
	};

}

module.exports = new Config();  // enforce a singleton config