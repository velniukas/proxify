var fs = require('fs'),
	nconf = require('nconf'),
	path = require('path'),
	restify = require('restify');

var server = restify.createServer({
	name: 'human-api-mock API',
	version: '0.0.1'
});
server.use(restify.bodyParser());

nconf.file( "human-api-mock", {	file: "../../config/human-api-mock.json" } );
console.log("human-api-mock:\n" + JSON.stringify(nconf.get('port')));

// Routes
require('./routes')(server);

server.listen(nconf.get("port"), function() {
	console.log('%s server listening at %s', server.name, server.url);
});

