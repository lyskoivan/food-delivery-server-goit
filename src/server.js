const http = require("http");
const url = require("url");

const morgan = require("morgan");
const router = require("./routes/router");
const getRouteHandler = require("./helpers/get-route-handler");

const logger = morgan("combined");

const startServer = port => {
  const server = http.createServer((req, res) => {
    const ddd = req.url;
    const parsedUrl = url.parse(req.url);

    const routerGet =
      getRouteHandler(router, parsedUrl.pathname) || router.default;

    logger(req, res, () => routerGet(req, res));
  });

  server.listen(port);
};

module.exports = startServer;
