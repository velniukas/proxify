reverse-proxy
=============

This implements api and authentication chaining from a (mobile/web) client to multiple back end services, with workflow, oauth, and proxying, and api exposed

To run:

1. start the Slang API server (on port 9000)
node ./services/slang-api/slang-api-server.js 

2. in another terminal, start the proxy server (on port 3000)
node ./server/server.js

3. in a third terminal, test the slang substitution
curl http://localhost:3000/translate/you_damn_monkey!

returns the correct substitution
you_DAMN!_monkey!

