const fs = require("fs");
const path = require("path");

const productsPath = path.join(__dirname, "../db/products/all-products.json");

const responseSuccess = (status, res) => {
  res.writeHead(200, { "Content-Type": "application/json" });
  res.write(JSON.stringify(status));
  res.end();
};

const responseWithoutProducts = res => {
  res.writeHead(400, { "Content-type": "application/json" });
  res.write(
    JSON.stringify({
      status: "no products",
      product: []
    })
  );
  res.end();
};

const getAllProducts = async (req, res, next) => {
  try {
    const readStream = await fs.createReadStream(productsPath);

    res.writeHead(200, { "Content-type": "application/json" });

    readStream.pipe(res);
  } catch (err) {
    console.log(err);
  }
};

const idProductRoute = (req, res, next) => {
  fs.readFile(productsPath, "utf8", (err, data) => {
    try {
      const allProducts = JSON.parse(data);
      const productId = req.params.id;

      const productById = allProducts.find(
        product => product.id === Number(productId)
      );

      if (productById.length !== 0) {
        const status = {
          status: "success",
          product: productById
        };

        responseSuccess(status, res);
      } else {
        responseWithoutProducts(res);
      }
    } catch (err) {
      console.log(err);
    }
  });
};

const queryIdsProductRoute = (req, res) => {
  fs.readFile(productsPath, "utf8", (err, data) => {
    try {
      const allProducts = JSON.parse(data);
      const queryStr = req.query.ids;

      const productsById = allProducts.filter(product =>
        queryStr.includes(product.id)
      );

      if (productsById) {
        const status = {
          status: "success",
          product: productsById
        };

        responseSuccess(status, res);
      } else {
        responseWithoutProducts(res);
      }
    } catch (err) {
      console.log(err);
    }
  });
};

const queryCateoryProductRoute = (req, res) => {
  fs.readFile(productsPath, "utf8", (err, data) => {
    try {
      const allProducts = JSON.parse(data);
      const queryStr = JSON.parse(req.query.category);

      const productsByCategory = allProducts.filter(product =>
        product.categories.includes(queryStr)
      );

      if (productsByCategory.length !== 0) {
        const status = {
          status: "success",
          product: productsByCategory
        };

        responseSuccess(status, res);
      } else {
        responseWithoutProducts(res);
      }
    } catch (err) {
      console.log(err);
    }
  });
};

module.exports = {
  getAllProducts,
  idProductRoute,
  queryIdsProductRoute,
  queryCateoryProductRoute
};
