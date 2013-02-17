module.exports = function() {};

var fs = require('fs'),
	nconf = require('nconf'),
	MsTranslator = require('mstranslator');
	
// Load secret key and export it
nconf.file( "microsoft-translate-proxy", {	file: "../../config/microsoft-translate-proxy.json" } );
console.log("microsoft-translate-clientid:\n" + JSON.stringify(nconf.get('microsoft-translate-clientid')));
console.log("microsoft-translate-secret:\n" + JSON.stringify(nconf.get('microsoft-translate-secret')));
var client_id = nconf.get('microsoft-translate-clientid');
var client_secret = nconf.get('microsoft-translate-secret');

if (!client_secret || !client_id) {
  console.log("microsoft translate: client_secret and client_id missing");
  process.exit(1);
}
var client = new MsTranslator({client_id: client_id, client_secret: client_secret});

module.exports.microsoftTranslate = function(text, from_lang, to_lang) {
	console.log('microsoft-translate-proxy: received '+ msg);

	client.initialize_token(function(){ 
		var params = {
			text: text,
			from: from_lang,
			to: to_lang
		};
		client.translate(params, function(err, data) {
	  		if (err) console.log('microsoft translate error: ' + err);
			console.log('microsoft-translate-proxy: sent '+ data);
			return data;
		});
	  });
}

