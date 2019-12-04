const express = require("express");
const corsMiddleware = require("cors");
const productRoutes = require("./products/productsRoutes");
const userRoutes = require("./user/signupRoutes");
const orderRoutes = require("./orders/orderRoutes");

const app = express();

app.use(express.json());
app.use(corsMiddleware());

app.use("/products", productRoutes);
app.use("/users", userRoutes);
app.use("/orders", orderRoutes);

app.listen(3000, () => {
  console.log("Server Listen");
});
