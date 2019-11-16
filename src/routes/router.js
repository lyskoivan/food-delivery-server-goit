const URL = require("url");
const querystring = require("querystring");

const mainRoute = require("./main/main");
const productsRoute = require("./products/allProducts");
const idProductRoute = require("./products/id");
const allIdProducts = require("./products/allIds");
const signupRoute = require("./signup/signupReoute");
const productsByCategory = require("./products/categories");

const router = url => {
  const reqUrl = URL.parse(url);
  const queryStr = querystring.parse(reqUrl.query);

  const productId = url.slice(10);

  if (queryStr.ids) {
    return allIdProducts;
  }
  if (queryStr.category) {
    return productsByCategory;
  }
  if (url === "/products") {
    return productsRoute;
  }
  if (url === `/products/${productId}`) {
    return idProductRoute;
  }
  if (url === "/signup") {
    return signupRoute;
  }
  return mainRoute;
};

module.exports = router;
