// From https://github.com/myGengo/mygengo_node/

// required modules
var http = require('http');
var crypto = require('crypto');
var multipart = require('multipart');
var fs = require('fs');
var mg_utils = require("./mg_utils");

// var declarations
var mg_public_key, mg_private_key, mg_hmac, mg_callback_functions, api_mygengo, mg_params = {}, mg_qs_params, mg_json_params, mg_image_path, mg_production_env, mg_host;

// Public functions

// initalizes the api. Just passes pub and pri keys.
// public key, private_key, json object of functions to be called when a call back happens, path for writing preview images, true/false for production or sandbox
exports.init = function(pub, pri, callback_functions, image_path, production) {
  mg_public_key = pub;
  mg_private_key = pri;
  mg_callback_functions = callback_functions;
  mg_production_env = production;
  mg_image_path = image_path;
  // checks which server to log into.
  if(mg_production_env){
	mg_host = 'api.mygengo.com';
    api_mygengo = http.createClient(80, 'api.mygengo.com');
  }else{
	mg_host = 'api.sandbox.mygengo.com';
    api_mygengo = http.createClient(80, 'api.sandbox.mygengo.com');
  }
}
// GET user balance
// returns the users balance
exports.getBalance = function(callback){
  // Add params before createsig
  callAPI('GET','/account/balance/',callback);
}
// GET user stats
// returns the users stats
exports.getStats = function(callback){
  // Add params before createsig
  callAPI('GET','/account/stats/',callback);
}
// GET language pairs
// returns a set of language pairs supported
exports.getLangPairs = function(callback){
  // Add params before createsig
  callAPI('GET','/translate/service/language_pairs/',callback);
}
// GET languages
// returns a set of languages supported
exports.getLanguages = function(callback){
  // Add params before createsig
  callAPI('GET','/translate/service/languages/',callback);
}

// GET comments
// This gets the comments for a single job from the system
// returns the comment thread details
exports.getComments = function(job_id,callback){
  // Add params before createsig
  callAPI('GET','/translate/job/'+job_id+'/comments/',callback);
}
// POST comments
// This posts a comment to a single job to the system.
// returns ?
exports.postComment = function(job_id,comment_data,callback){
  // Building job load
  mg_params.data = JSON.stringify(comment_data);
  callAPI('POST','/translate/job/'+job_id+'/comment/',callback);
}

// GET feedback
// This gets the feedback for a single job from the system
// returns the comment thread details
exports.getFeedback = function(job_id,callback){
  // Add params before createsig
  callAPI('GET','/translate/job/'+job_id+'/feedback/',callback);
}

// GET revisions
// This gets the revisions of a single job from the system
// returns the comment thread details
exports.getRevisions = function(job_id,callback){
  // Add params before createsig
  callAPI('GET','/translate/job/'+job_id+'/revisions/',callback);
}
// GET revision
// This gets a single job from the system
// returns the revision details?
exports.getRevision = function(job_id,rev_id,callback){
  // Add params before createsig
  callAPI('GET','/translate/job/'+job_id+'/revision/'+rev_id+'/',callback);
}


// POST job
// This posts a single job to the system.
// returns the job details
exports.postJob = function(job_data,callback){
  // Building job load
  mg_params.data = JSON.stringify(job_data);
  callAPI('POST','/translate/job/',callback);
}

// PUT job
// This updates a single job in the system.
// returns the job details
exports.putJob = function(job_id,data,callback){
  // Building job load
  mg_params.data = JSON.stringify(data);
  callAPI('PUT','/translate/job/'+job_id+'/',callback);
}

// Convience function ~ 
exports.reviseJob = function(job_id,revise_comment,callback){
  mg_params.data = JSON.stringify({action:'revise',comment:revise_comment});
  callAPI('PUT','/translate/job/'+job_id+'/',callback);
}
// Convience function ~ 
exports.approveJob = function(job_id,approve_data,callback){
  approve_data.action = 'approve';
  mg_params.data = JSON.stringify(approve_data);
  callAPI('PUT','/translate/job/'+job_id+'/',callback);
}
// Convience function ~ 
exports.rejectJob = function(job_id,reject_data,callback){
  approve_data.action = 'reject';
  mg_params.data = JSON.stringify(reject_data);
  callAPI('PUT','/translate/job/'+job_id+'/',callback);
}


// POST jobs
// This posts a full job load to the system.
// returns the job details
exports.postJobs = function(job_data, callback){
  // Building job load
  mg_params.data = JSON.stringify(job_data);
  callAPI('POST','/translate/jobs/',callback);
}
// POST jobs
// This posts a full job load to the system.
// returns the job details
exports.postQuote = function(job_data, callback){
  // Building job load
  mg_params.data = JSON.stringify(job_data);
  callAPI('POST','/translate/service/quote',callback);
}

// GET job
// This gets a single job from the system
// returns the job details
exports.getJob = function(job_id,callback){
  // Add params before createsig
  callAPI('GET','/translate/job/'+job_id+'/',callback);
}
// DELETE job
// This gets delets single job from the system
// returns the ok
exports.deleteJob = function(job_id,callback){
  // Add params before createsig
  callAPI('DELETE','/translate/job/'+job_id+'/',callback);
}
// GET jobs
// This the jobs that are in the system for a single user
// returns all the job details
exports.getJobs = function(opt_data,callback){
  if(opt_data.status){mg_params.status = opt_data.status};
  if(opt_data.timestamp_after){mg_params.timestamp_after = opt_data.timestamp_after};
  if(opt_data.count){mg_params.count = opt_data.count};
  // Add params before createsig
  callAPI('GET','/translate/jobs/',callback);
}
// GET jobsgroup
// This gets all the jobs in a group from the system.
// returns all the job details
exports.getJobGroup = function(group_id, callback){
  // Add params before createsig
  callAPI('GET','/translate/jobs/'+group_id+'/',callback);
}

// GET preview image
// This gets the preview image url and writes it to file, then sends a url link to the file.
// returns the image URL
exports.getPreviewURL = function(job_id,callback){
  callAPI('GET','/translate/job/'+job_id+'/preview/',callback,'binary',function(mg_response){
	fs.writeFile(mg_image_path+job_id+".jpg",mg_response,'binary',function(err){
		if (err) callback(err);
		callback({preview_url:'/images/translation_previews/'+job_id+".jpg"});
	});
  });
};

// This function is used when a callback function has been defined.
// if a callback is passed than it will be passed the data once parsed.
// otherwise if a predefined function has been defined it will call that.
// or fail.
exports.mg_callback = function(req,res,callback){
  var parser = multipart.parser();
  var mg_callback_type = "";
  var mg_callback_data = "";
  parser.headers = req.headers;
  // pass the response to the multipart parser
  req.addListener('data',function(chunk){
    parser.write(chunk);
  });
  parser.onPartBegin = function (part){ 
	mg_callback_type = part.name;
  }
  // write the data to a string
  parser.onData = function(chunk){
    mg_callback_data += chunk;
  };
  // close the parser and return the data
  parser.onPartEnd = function(){
    parser.close();
   mg_callback_data = JSON.parse(mg_callback_data);
	// If a callback has been defined call it
	console.log(mg_callback_type);
	if(typeof(callback) === 'function'){
		callback(mg_callback_type,mg_callback_data);
	}else{ // if not, use the predefined functions
		if(typeof(mg_callback_functions[mg_callback_type][mg_callback_data.status]) === 'function'){
			mg_callback_functions[mg_callback_type][mg_callback_data.status](mg_callback_data);
		}
	}
  }
}
// private functions
//
// The callAPI function takes a method, a url and a callback.
// it creates a time stamp, the api sig and then passes the correct headers
// for the method. It also creates the response object which simply calls the callback
// function that was passed.

function callAPI(method,mg_url,callback,encoding,override){
  if(!encoding){
    encoding = 'utf8';
  }
  mg_params.api_key = mg_public_key;
  mg_params.ts = String(Math.round(new Date().getTime() / 1000));
  // Sort params
  mg_params = mg_utils.ksort(mg_params);
  // Make inital param string for creating sig
  mg_qs_params = mg_utils.utf8Encode(mg_utils.http_build_query(mg_params));
  mg_json_params = mg_utils.utf8Encode(JSON.stringify(mg_params).replace(/\//g,'\\/'));

  // sig is based off different things depending on the request type
  // should delete params be passed via request body?
  if(method == 'GET' || method == 'DELETE'){
    // create sig
    mg_params.api_sig = crypto.createHmac('sha1',mg_private_key).update(mg_qs_params).digest("hex");
    // Rebuild the param qs with the sig attached.
    mg_qs_params = mg_utils.http_build_query(mg_params);
    // create the get headers
    var request = api_mygengo.request(method,'/v1'+mg_url+'?'+mg_qs_params,{
                                    "host":mg_host,
                                    "Accept":"application/json",
                                    "User-Agent":"myGengo Node.js Library; Version 0.0.1; http://mygengo.com/;"});
  }else{
    // create sig
    mg_params.api_sig = crypto.createHmac('sha1',mg_private_key).update(mg_json_params).digest("hex");
    // Rebuild the param qs with the sig attached.
    mg_qs_params = mg_utils.http_build_query(mg_params);
    // create the post headers
    var request = api_mygengo.request(method,'/v1'+mg_url,{
                                    "Host":mg_host,
                                    "Accept":"application/json",
                                    "Content-Length":mg_qs_params.length,
                                    "Content-Type":"application/x-www-form-urlencoded",
                                    "User-Agent":"myGengo Node.js Library; Version 0.0.1; http://mygengo.com/;"});
    request.write(mg_qs_params,'utf8');
  }
  // Make request and pass response to the callback.
  request.end();
  var mg_response = "";
  request.on('response', function (response) {
    response.setEncoding(encoding);
    response.on('data', function (chunk) {
      mg_response += chunk;
      console.log('BODY: ' + chunk);
    });
    response.on('end',function(){
      mg_params = {};
      if(!override){
        if(mg_response != ""){
          callback(JSON.parse(mg_response));
        }else{
          callback();
        }
      }else{
        override(mg_response);
      }
    });
  });
}