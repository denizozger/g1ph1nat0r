'use strict'

function Config() {

  this.giphy = {
    BASE_URL: 'http://api.giphy.com/v1/gifs',
    API_KEY: process.env.GIPHY_API_KEY || 'dc6zaTOxFJmzC' // public key, so it *should be* ok to hardcode
  };

  this.db = {
    URL: process.env.DATABASE_URL
  }

}

module.exports = Object.freeze(new Config());  // enforce an immutable & singleton config
