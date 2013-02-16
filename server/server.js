var fs = require('fs'),
	nconf = require('nconf');
	http = require('http'),
	httpProxy = require('http-proxy'),
	restify = require('restify');

nconf.argv()
	 .env()
	 .file( 'server', {	file: './config/server.json' } );

// load the reverse proxy route table 
nconf.file( 'routes', { file: './config/routes.json' } );
console.log("config=\n" + JSON.stringify(nconf.get('router')));
var options = { router: nconf.get('router') };

// reverse proxy using routes.json config lookup table 
var proxyServer = httpProxy.createServer(options);
proxyServer.listen(nconf.get('port'));
console.log('proxy server listening at ' + nconf.get('port'));
