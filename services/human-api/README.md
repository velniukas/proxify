HUMAN-API-MOCK
================

run this server to provide a basic TRANSLATE regexp

To run:

node human-api-mock.js

To configure:
config.json
	port: sets the port to run on
	mock: dummy text to prepend

to test:
curl http://localhost:7000/translate/translate-this-into-french

or run the test.js in /spec folder

