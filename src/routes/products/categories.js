const URL = require("url");
const querystring = require("querystring");

const fs = require("fs");
const path = require("path");

const idProductRoute = (req, res) => {
  const productsPath = path.join(
    __dirname,
    "../../",
    "db",
    "products",
    "all-products.json"
  );

  fs.readFile(productsPath, "utf8", (err, data) => {
    try {
      const allProducts = JSON.parse(data);
      const reqUrl = URL.parse(req.url);
      const queryStr = querystring.parse(reqUrl.query);
      const queryCategory = queryStr.category.slice(
        1,
        queryStr.category.length - 1
      );

      const productsByCategory = allProducts.filter(product =>
        product.categories.includes(queryCategory)
      );

      if (productsByCategory.length !== 0) {
        const status = {
          status: "success",
          product: productsByCategory
        };

        res.writeHead(200, { "Content-Type": "application/json" });
        res.write(JSON.stringify(status));
        res.end();
      } else {
        res.writeHead(400, { "Content-type": "application/json" });
        res.write(
          JSON.stringify({
            status: "no products",
            product: productsByCategory
          })
        );
        res.end();
      }
    } catch (err) {
      console.log(err);
    }
  });
};
module.exports = idProductRoute;
