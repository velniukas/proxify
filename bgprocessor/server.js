
var util = require('util');
var EventEmitter = require('events').EventEmitter;

// TODO: Convert this into a redis processing queue later
var accounts = [];

// Collects all the tweets from all registered accounts and emits them individually with "tweet" event, which can be used to chain it with other processors
var AccountReader = function() {
	EventEmitter.call(this);

	for (var index = accounts.length - 1; index >= 0; index--) {
		var account = accounts[index];

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
