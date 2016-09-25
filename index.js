'use strict'

global.libRequire = file => require(__dirname + '/lib/' + file);

const 
	express 					= require('express'),
  giphinateHandler 	= libRequire('handlers/giphinate'),
  app 							= express(),
  port 							= process.env.PORT || 3000;

app.get('/:queryText', giphinateHandler);

app.listen(port, () => {
  console.log(`Giphinator listening on port ${port}`);
});

module.exports = app;
