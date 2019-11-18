const URL = require("url");
const querystring = require("querystring");

const idProductRoute = require("./id");
const allIdProducts = require("./allIds");
const productsByCategory = require("./categories");
const allProducts = require("./allProducts");

const handleProductsRoute = (req, res) => {
  const reqUrl = URL.parse(req.url);
  const queryStr = querystring.parse(reqUrl.query);
  const productId = req.url.slice(10);

  if (queryStr.ids) {
    allIdProducts(req, res);
    return;
  } else if (queryStr.category) {
    productsByCategory(req, res);
    return;
  } else if (req.url === `/products/${productId}`) {
    idProductRoute(req, res);
    return;
  } else if (req.url === "/products") {
    allProducts(req, res);
    return;
  }
  res.writeHead(400, { "Content-type": "text/plain" });
  res.write("Client Error");
  res.end();
  return;
};

module.exports = handleProductsRoute;
