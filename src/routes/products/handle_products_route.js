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

  if (req.url === `/products/${productId}`) {
    return idProductRoute;
  }

  if (queryStr.ids) {
    return allIdProducts;
  } else if (queryStr.category) {
    return productsByCategory;
  }

  return allProducts;
};

module.exports = handleProductsRoute;
