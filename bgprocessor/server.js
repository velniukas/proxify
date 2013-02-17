
var util = require('util');
var EventEmitter = require('events').EventEmitter;

var async = require('async');

// TODO: Convert this into a redis processing queue later
var accounts = [];

// Collects all the tweets from all registered accounts and emits them individually with "tweet" event, which can be used to chain it with other processors
var AccountReader = function(accounts) {
	var self = this;
	EventEmitter.call(this);

	for (var index = accounts.length - 1; index >= 0; index--) {
		var account = accounts[index];

		// TODO: Implement
		getTweetsFromTimeline(account, function(error, tweets) {
			if(error) {
				console.log(error);
				return self.emit('error', error);
			}

			for(var twIndex = tweets.length - 1; twIndex >= 0; twIndex--) {
				self.emit('tweet', tweets[twIndex]);
			}
		});
	}
};

util.inherits(AccountReader, EventEmitter); 


// Plugin chain
var PluginChain = function(plugins) {
	EventEmitter.call(this);

	this.plugins = plugins;
};

util.inherits(PluginChain, EventEmitter);

PluginChain.process = function(input) {
	var self = this;

	async.forEachSeries(self.plugins, function(pluginName, callback) {
		var plugin = require('./plugins/' + pluginName);
		plugin.exec(input, callback);
	}, function(error, result) {
		if(error) {
			console.log(error);
			return self.emit('error', error);
		}

		self.emit('result', result);
	});
};


// Start the process
var accReader = new AccountReader(accounts);
var pluginChain = new PluginChain(['slang']);

var onError = function(error) {
	console.log("ERROR:: ", error);
}

accReader.on('error', onError);
pluginCHain.on('error', onError);

accReader.on('tweet', function(tweet) {
	// Process the tweet
	pluginChain.process(tweet);
});

pluginChain.on('result', function(result) {
	console.log("Output:: ", result);
})