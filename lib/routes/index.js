const 
	express 					= require('express'),
	router 						= express.Router(),
	giphinateHandler 	= libRequire('handlers/giphinate');

module.exports = router;

router.get('/:queryText', giphinateHandler);

// Client and server error handling
router.use((req, res, next) => res.status(404).send('No GIFs found!'));
router.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Oops, sorry! There was an error, please try again later.');
});