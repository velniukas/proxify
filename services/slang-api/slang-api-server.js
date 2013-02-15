var fs = require('fs'),
	nconf = require('nconf'),
	path = require('path'),
	restify = require('restify');

var server = restify.createServer({
	name: 'Slang API',
	version: '0.0.1'
});
server.use(restify.bodyParser());

nconf.file( "config", {	file: "../../config/slang-api.json" } );
console.log("config:\n" + JSON.stringify(nconf.get('slang-api-port')));
nconf.file( "slang", {	file: "../../config/slang.json" } );

console.log("slang:\n" + JSON.stringify(nconf.get('slang')));

String.prototype.multiReplace = function(hash) {
	var str = this, key;
	for( key in hash ) {
		str = str.replace( new RegExp( key, 'g' ), hash[key] );
	}
	return str;
}

// replace all slang text 
function translateSlang(msg) {
	console.log('slang: received '+ msg);
	var text = msg;
	text = text.multiReplace(nconf.get('slang'));
	console.log('slang: sent '+ text);
	return text;
}

function translateMessage(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	res.send( translateSlang( req.params.message ) );
	return next();
}

server.get('/translate/:message', translateMessage);

server.listen(nconf.get("slang-api-port"), function() {
	console.log('%s server listening at %s', server.name, server.url);
});

