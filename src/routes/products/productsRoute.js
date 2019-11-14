const fs = require("fs");
const path = require("path");
/*
если url + /:id = req ('pr/id')
*/
const userRoute = (req, res) => {
  const prodUrl = req.url;
  const test = prodUrl.slice(9);
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
module.exports = userRoute;
