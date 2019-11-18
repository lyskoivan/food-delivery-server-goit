const fs = require("fs");
const path = require("path");

const productRoute = (req, res) => {
  const productsPath = path.join(
    __dirname,
    "../../",
    "db",
    "products",
    "all-products.json"
  );

  res.writeHead(200, { "Content-type": "application/json" });

  const readStream = fs.createReadStream(productsPath);

  readStream.pipe(res);
};
module.exports = productRoute;
