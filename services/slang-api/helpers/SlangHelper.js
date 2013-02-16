var fs = require('fs'),
	nconf = require('nconf');
	
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
module.exports.translateSlang = function(msg) {
	console.log('slang: received '+ msg);
	var text = msg;
	text = text.multiReplace(nconf.get('slang'));
	console.log('slang: sent '+ text);
	return text;
}
