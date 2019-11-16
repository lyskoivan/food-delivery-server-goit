const http = require("http");

const morgan = require("morgan");
const router = require("./routes/router");

const logger = morgan("combined");

const startServer = port => {
  const server = http.createServer((req, res) => {
    const routerGet = router(req.url);

    logger(req, res, () => routerGet(req, res));
  });

  server.listen(port);
};

module.exports = startServer;
