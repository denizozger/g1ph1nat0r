'use strict'

const 
	express 					= require('express'),
  giphinateHandler 	= require('./lib/handlers/giphinate'),
  app 							= express(),
  port 							= process.env.PORT || 3000;

app.get('/:queryText', giphinateHandler);

app.listen(port, () => {
  console.log(`Giphinator listening on port ${port}`);
});

module.exports = app;
