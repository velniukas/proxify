var translation = require('./translation');

module.exports = function(server) {

	server.get('/translate/:message', translation.workflowTranslateMessage);
	server.get('/translate/slang/:message', translation.slangTranslateMessage);
	server.get('/translate/human/:message', translation.human.TranslateMessage);
	server.get('/translate/google/:message', translation.googleTranslateMessage);

}