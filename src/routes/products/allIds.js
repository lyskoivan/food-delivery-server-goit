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
      const queryIds = queryStr.ids
        .slice(1, queryStr.ids.length - 1)
        .split(",");

      const productsById = allProducts.filter(product => {
        return queryIds.find(id => product.id === Number(id));
      });

      if (productsById) {
        const status = {
          status: "success",
          product: productsById
        };

        res.writeHead(200, { "Content-Type": "application/json" });
        res.write(JSON.stringify(status));
        res.end();
      } else {
        res.writeHead(400, { "Content-type": "text/plain" });
        res.write("Bad request");
        res.end();
      }
    } catch (err) {
      console.log(err);
    }
  });
};
module.exports = idProductRoute;
