'use strict'

global.libRequire = file => require(__dirname + '/lib/' + file);

const 
  express = require('express'),
  app     = express(),  
  routes  = libRequire('routes'),
  port    = process.env.PORT || 3000;

module.exports = app;

app.use('/', routes);

app.listen(port, console.log(`Giphinator listening on port ${port}`));
