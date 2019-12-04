const express = require("express");
const corsMiddleware = require("cors");
const productRoutes = require("./products/productsRoutes");
const userRoutes = require("./user/signupRoutes");

const app = express();

app.use(express.json());
app.use(corsMiddleware());

app.use("/products", productRoutes);
app.use("/users", userRoutes);

app.listen(3000, () => {
  console.log("Server Listen");
});
