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
      const productId = Number(req.url.slice(10));

      const productById = allProducts.find(product => product.id === productId);

      if (productById) {
        const status = {
          status: "success",
          product: productById
        };

        res.writeHead(200, { "Content-Type": "application/json" });
        res.write(JSON.stringify(status));
        res.end();
      }
      res.writeHead(400, { "Content-type": "text/plain" });
      res.write("Bad request");
      res.end();
    } catch (err) {
      console.log(err);
    }
  });
};
module.exports = idProductRoute;
