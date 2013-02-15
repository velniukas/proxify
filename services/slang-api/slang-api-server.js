var fs = require('fs'),
	nconf = require('nconf'),
	path = require('path'),
	express = require('express'),
	http = require('http');

var app = express();

nconf.use( "file", {	file: "config.json" } );

console.log("config=\n" + nconf.get('slang'));

String.prototype.multiReplace = function(hash) {
	var str = this, key;
	for( key in hash ) {
		str = str.replace( new RegExp( key, 'g' ), hash[key] );
	}
	return str;
}

app.get('/translate', function(req, res) {
	// replace all slang text 
	console.log('slang: received '+ req.body);
	var text = req.body;
	var body = text.multiReplace(nconf.get('slang'));
	console.log('slang: sent '+ text);

	res.setHeader('Content-Type', 'text/plain');
	res.setHeader('Content-Length', body.length);
	res.end(body);

});

app.listen(nconf.get("port"));

console.log('Slang API server listening on '+ nconf.get('host') + ":" + nconf.get('port'));