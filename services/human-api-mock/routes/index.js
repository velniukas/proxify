module.exports = function() {};

var translate = require('./translate');

// see https://github.com/myGengo/mygengo_node/blob/master/example/rough_example_file.js
var gengo = require('../helpers/mygengo');

var mg_public_key = "YOUR PUBLIC KEY",
	mg_private_key = "YOUR PRIVATE KEY";
	mg_callback_functions = {
		'job':{
			'reviewable': function(mg_callback_data){
				// Job is in reviewable
				console.log(mg_callback_data);
			}
		},
		'comment': function(){
			// comment call back
		}
	};
gengo.init(mg_public_key, mg_private_key,mg_callback_functions, 'public/images/translation_previews/', false);


module.exports = function(server) {

	server.get('/translate/test/:message', translate.translateMessage);

	// this will be our function when mygengo posts to use. Please define it in your mygengo account page.
	app.post('/mygengo/mg_callback',function(req,res){
	  gengo.mg_callback(req,res);
	});
	server.get('/translate/getlangpairs', gengo.getLangPairs);
	server.get('/translate/getstats', gengo.getStats);
	server.get('/translate/getbalance', gengo.getBalance);
	server.get('/translate/getlanguages', gengo.getLanguages);
	server.get('/translate/getjob/:jobid', gengo.getJob);
	server.get('/translate/getpreview/:jobid', gengo.getPreview);
	server.get('/translate/postjobs', gengo.postJobs);
	server.get('/translate/postquote', gengo.postQuote);
	server.get('/translate/getfeedback/:jobid', gengo.getFeedback);
	server.get('/translate/getrevisions/:jobid/:revid', gengo.getRevisions);
	server.get('/translate/getcomments/:jobid', gengo.getComments);
	server.get('/translate/postcomment', gengo.postComment);
	server.get('/translate/deletejob/:jobid', gengo.deleteJob);
	server.get('/translate/revisejob/:jobid', gengo.reviseJob);
	server.get('/translate/approvejob/:jobid', gengo.approveJob);

}