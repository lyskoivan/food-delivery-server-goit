const mainRoute = require("./main/main");
const productsRoute = require("./products/productsRoute");
const signupRoute = require("./signup/signupReoute");
const router = {
  "/products": productsRoute,
  "/signup": signupRoute,
  default: mainRoute
};
module.exports = router;
