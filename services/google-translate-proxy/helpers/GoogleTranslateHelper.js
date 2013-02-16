var fs = require('fs'),
	nconf = require('nconf'),
	translate = require('node-google-translate');
	
// Load secret key and export it
nconf.file( "google-translate-proxy", {	file: "../../config/google-translate-proxy.json" } );
console.log("google-translate-proxy-key:\n" + JSON.stringify(nconf.get('google-translate-key')));
var key = nconf.get('google-translate-key');
 
module.exports.googleTranslate = function(msg) {
	console.log('google-translate-proxy: received '+ msg);
	translate({key: key, q: msg, target: 'fr'}, function(result) {
		console.log('google-translate-proxy: sent '+ result);
		return result;
	});
}
