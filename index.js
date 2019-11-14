const { port } = require("./config");
const startServer = require("./src/server");

startServer(port);

/*
1. added get for id
2. added get with many id (map + qs)
3. added get for category (filter)
 3.1 if (!prdoucts) status = no prod
*/
