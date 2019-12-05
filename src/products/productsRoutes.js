const { Router } = require("express");

const {
  getAllProducts,
  idProductRoute,
  queryIdsProductRoute,
  queryCateoryProductRoute
} = require("./productsControllers");

const router = Router();

router.get("/:id", idProductRoute);

router.get("/", (req, res) => {
  const requestQuery = Object.keys(req.query)[0];

  req.url === "/" && getAllProducts(req, res);
  requestQuery === "ids" && queryIdsProductRoute(req, res);
  requestQuery === "category" && queryCateoryProductRoute(req, res);
});

module.exports = router;
