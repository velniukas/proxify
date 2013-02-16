var fs = require('fs'),
	nconf = require('nconf'),
	path = require('path'),
	restify = require('restify');

var server = restify.createServer({
	name: 'Google Translate Mock API',
	version: '0.0.1'
});
server.use(restify.bodyParser());

nconf.file( "config", {	file: "../../config/google-translate-mock-api.json" } );
console.log("config:\n" + JSON.stringify(nconf.get('google-translate-mock-api-port')));

// Routes
require('./routes')(server);

server.listen(nconf.get("google-translate-mock-api-port"), function() {
	console.log('%s server listening at %s', server.name, server.url);
});

