module.exports = function() {};

var google = require('../helpers/GoogleMockHelper');

// translation routes
module.exports.translateMessage = function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	res.send( google.translate( req.params.message ) );
	return next();
};

module.exports.translateMany = function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	var messages = req.params.messages;
	for( msg in messages ) {
		res.send( translateMessage( msg ) );
	}
	return next();
};