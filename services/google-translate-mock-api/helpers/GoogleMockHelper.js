var fs = require('fs'),
	nconf = require('nconf');
	
nconf.file( "google-mock", {	file: "../../config/google-mock.json" } );
console.log("google-mock:\n" + JSON.stringify(nconf.get('google-mock')));
	
String.prototype.multiReplace = function(hash) {
	var str = this, key;
	for( key in hash ) {
		str = str.replace( new RegExp( key, 'g' ), hash[key] );
	}
	return str;
}

// translate text
module.exports.translate = function(msg) {
	console.log('google-mock: received '+ msg);
	var text = msg;
	text = text.multiReplace(nconf.get('google-mock'));
	console.log('google-mock: sent '+ text);
	return text;
}
