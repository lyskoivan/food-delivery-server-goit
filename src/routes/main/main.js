const mainRoute = (req, res) => {
  res.writeHead(200, { "Content-type": "text/htm" });
  res.write("<h1>Hello world main :3</h1>");
  res.end();
};

module.exports = mainRoute;
