const path = require("path");
const fs = require("fs");

const shortid = require("shortid");

const saveOrder = async order => {
  const orderPath = path.join(__dirname, "../", "db", "orders", "orders.json");

  await fs.readFile(orderPath, (err, data) => {
    if (err) throw err;

    const orders = [order, ...JSON.parse(data)];

    const orderInJson = JSON.stringify(orders);

    fs.writeFile(orderPath, orderInJson, err => {
      if (err) throw err;
    });
  });
};

const responseWithoutProducts = res => {
  res.writeHead(400, { "Content-type": "application/json" });
  res.write(
    JSON.stringify({
      status: "failed",
      order: null
    })
  );
  res.end();
};

const postOrder = (req, res) => {
  const order = { id: shortid.generate(), ...req.body };

  if (order.products.length === 0) {
    responseWithoutProducts(res);
  }
  if (
    !order ||
    !order.user ||
    !order.products ||
    !order.deliveryType ||
    !order.deliveryAdress
  ) {
    res.status(400).send("Client Error");
    return;
  }

  saveOrder(order);

  res.writeHead(201, { "Content-type": "application/json" });
  res.write(JSON.stringify({ status: "success", order }));
  res.end();
};

module.exports = { postOrder };
