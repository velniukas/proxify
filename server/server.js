var fs = require('fs'),
	nconf = require('nconf');
	jasmine = require('jasmine-node'),
	http = require('http'),
	https = require('https'),
	path = require('path'),
	crypto = require('crypto'),
	httpProxy = require('http-proxy');

nconf.argv()
	 .env()
	 .file( 'server', {	file: 'server.config.json', dir: '../config/' } );

// load the reverse proxy route table 
var routing = nconf.add( 'routes', { file: 'routes.json', dir: '../config/' } );
// generic function to load the credentials from disk
function getCredentialsContext(cert) {
	return crypto.createCredentials({
		key: fs.readFileSync(path.join(__dirname, 'certs', cert + '.key')),
		cert: fs.readFileSync(path.join(__dirname, 'certs', cert + '.crt'))
	}).context;
}

// certificate per domain hash - make this configurable 
var certs = {
	'foobar.com': getCredentialsContext('foobar'),
	'barbaz.com': getCredentialsContext('barbaz')
};

// reverse proxy using routes.json config lookup table 
var proxyServer = httpProxy.createServer(routing);
proxyServer.listen(80);

// sample forward proxy e.g. for load balancing
var proxyForwardServer = httpProxy.createServer(9000, 'localhost', {
	forward: {
		port: 9000,
		host: 'staging.com'
	}
});
proxyForwardServer.listen(80);