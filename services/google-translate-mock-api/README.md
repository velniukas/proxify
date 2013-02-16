GOOGLE-TRANSLATE-MOCK-API-SERVER
================

run this server to provide a basic TRANSLATE regexp

To run:

node google-translate-mock-api-server.js

To configure:
config.json
	port: sets the port to run on
	google-mock: a hash of regexp in form "original" : "replacement"

to test:
curl http://localhost:7000/translate/damn+you

or run the test.js in /spec folder

