'use strict'

const 
  config    = libRequire('config'),
  giphyApi  = libRequire('services/giphy'),
  cache     = libRequire('services/cache');

const giphinate = module.exports = {

  /**
   * @params req.params.queryText {String} Text to query giphy for
   * @return giphy {Object} with query and url attributes
   */
  get: (req, res, next) => {
    const query = req.params.queryText;

    cache.get(query)
      .then(giphy => giphy || giphyApi.search(query).then(url => cache.set(query, url)))
      .then(giphy => {
        if (!giphy) next();
        res.json({query: query, url: giphy.url});
      })
      .catch(next);
  },

  /**
   * @params req.params.queryText {String} Text to query giphy for
   * @return HTTP 200 with the query payload {Object} if cache was invalidated successfully, 
   *  HTTP 400 if they key wasn't found
   */
  delete: (req, res, next) => {
    const query = req.params.queryText;

    cache.delete(query)
      .then(hit => hit ? res.json({query: query}) : res.status(404).send())
      .catch(next);
  }

}
