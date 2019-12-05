const { Router } = require("express");

const { postOrder } = require("./ordersControllers");

const router = Router();

router.post("/", postOrder);

module.exports = router;
