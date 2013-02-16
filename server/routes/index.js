var translate = require('./translate');

module.exports = function(server) {

	server.get('/translate/:message', workflow.translateMessage);
	server.get('/translate/slang/:message', slang.translateMessage);
	server.get('/translate/human/:message', human.translateMessage);
	server.get('/translate/google/:message', google.translateMessage);

}