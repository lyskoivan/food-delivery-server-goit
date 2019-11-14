const mainRoute = require("./main/main");
const productsRoute = require("./products/productsRoute");
const signupRoute = require("./signup/signupReoute");
// const test = url => {
//   const ddd = url.slice(9);
//   if (url === "/products") {
//   }
//   if (url.slice)
//     if (url === "/signup") {
//     }
// };
const router = {
  "/products": productsRoute,
  "/signup": signupRoute,
  default: mainRoute
};
module.exports = router;
