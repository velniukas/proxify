module.exports = function() {};

var turk = require('../helpers/TurkHelper');

// translation routes
module.exports.translateMessage = function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	res.send( turk.translate( req.params.message ) );
	return next();
};