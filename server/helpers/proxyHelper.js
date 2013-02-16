module.exports = function() {};

var fs = require('fs'),
	nconf = require('nconf');
	http = require('http'),
	httpProxy = require('http-proxy'),
//	https = require('https'),
	//path = require('path'),
//	crypto = require('crypto'),
	restify = require('restify');

nconf.argv()
	 .env()
	 .file( 'server', {	file: './config/server.json' } );

// load the reverse proxy route table 
nconf.file( 'routes', { file: './config/routes.json' } );
console.log("config=\n" + JSON.stringify(nconf.get('router')));
var options = { router: nconf.get('router') };

// generic function to load the credentials from disk
//function getCredentialsContext(cert) {
//	return crypto.createCredentials({
//		key: fs.readFileSync(path.join(__dirname, 'certs', cert + '.key')),
//		cert: fs.readFileSync(path.join(__dirname, 'certs', cert + '.crt'))
//	}).context;
//}

// certificate per domain hash - make this configurable 
//var certs = {
//	'foobar.com': getCredentialsContext('foobar'),
//	'barbaz.com': getCredentialsContext('barbaz')
//};

// sample forward proxy e.g. for load balancing
//var proxyForwardServer = httpProxy.createServer(9000, 'localhost', {
//	forward: {
//		port: 9000,
//		host: 'staging.com'
//	}
//});
//proxyForwardServer.listen(80);

// reverse proxy using routes.json config lookup table 
var proxyServer = httpProxy.createServer(options);
proxyServer.listen(nconf.get('port'));
console.log('proxy server listening at ' + nconf.get('port'));