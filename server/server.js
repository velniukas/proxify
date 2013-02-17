// config vars
var LOGIN_PATH    = '/api/weibo_login';
var CALLBACK_PATH = '/api/weibo_callback';
var SERVER_PREFIX = 'http://localhost:3000';
var TWITTER_CONSUMER_KEY = 'zCowcooSHUM17tQJBltFA';
var TWITTER_CONSUMER_SECRET = 'RqS6AEirMStp6Zo3zfnqCE6RVSICuk9KC5TbjP2Ar0';
var TWITTER_API = 'https://api.twitter.com';

var restify = require('restify')
  , passport = require('passport')
  , TwitterStrategy = require('passport-twitter').Strategy;

passport.use(new TwitterStrategy({
      consumerKey: TWITTER_CONSUMER_KEY
    , consumerSecret: TWITTER_CONSUMER_SECRET
    , callbackURL: SERVER_PREFIX + CALLBACK_PATH
  },
  function(token, tokenSecret, profile, done) {
    // TODO: Save credentials in the database
    
    var error, user;
    user = profile;
    
    done(error, user);
  }
));
 

// Initialize Server
var server = restify.createServer();
server.use(restify.queryParser());

// initialize passport
server.use(passport.initialize());

server.get(LOGIN_PATH, passport.authenticate('twitter'))
server.get(CALLBACK_PATH, passport.authenticate('twitter' , {
    successRedirect: '/'
  , failureRedirect: LOGIN_PATH
}));
 
// Start the app by listening on <port>
var port =  process.env.PORT || 3000
server.listen(port)
console.log('App started on port ' + port)
