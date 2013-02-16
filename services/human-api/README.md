HUMAN-API-SERVER
================

run this server to provide a basic TRANSLATE regexp

To run:

node turk-api-server.js

To configure:
config.json
	port: sets the port to run on
	turk: a hash of regexp in form "original" : "replacement"

to test:
curl http://localhost:9000/translate/damn+you

or run the test.js in /spec folder

