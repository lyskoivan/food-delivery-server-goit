const { Router } = require("express");

const { signUpRoute } = require("./signupControllers");
const { getUserIdRoute } = require("./userGetControllers");

const router = Router();

router.get("/:id", getUserIdRoute);
router.post("/", signUpRoute);

module.exports = router;
