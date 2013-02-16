var fs = require('fs'),
	nconf = require('nconf');
	
nconf.file( "human-api-mock", {	file: "../../config/human-api.json" } );
console.log("human-api-mock:\n" + JSON.stringify(nconf.get('mock')));
	

// prepends some simple text to the 'translated message'
module.exports.translate = function(msg) {
	console.log('turk: received '+ msg);
	var text = nconf.get('mock') + msg;
	console.log('turk: sent '+ text);
	return text;
}
