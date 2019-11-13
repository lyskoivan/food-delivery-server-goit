const { port } = require("./config");
const startServer = require("./src/server");

startServer(port);
