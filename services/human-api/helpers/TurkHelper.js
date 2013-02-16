var fs = require('fs'),
	nconf = require('nconf');
	
nconf.file( "turk", {	file: "../../config/turk.json" } );
console.log("turk:\n" + JSON.stringify(nconf.get('turk')));
	
String.prototype.multiReplace = function(hash) {
	var str = this, key;
	for( key in hash ) {
		str = str.replace( new RegExp( key, 'g' ), hash[key] );
	}
	return str;
}

// translate text
module.exports.translate = function(msg) {
	console.log('turk: received '+ msg);
	var text = msg;
	text = text.multiReplace(nconf.get('turk'));
	console.log('turk: sent '+ text);
	return text;
}
