var translate = require('./translate');

module.exports = function(server) {

	server.get('/translate/:message', translate.translateMessage);

}