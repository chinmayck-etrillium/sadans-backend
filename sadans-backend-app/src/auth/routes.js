const express = require("express");
const controller = require("./controller");
const router = express.Router();

router.post("/create-user", controller.createUser);
router.post("/login", controller.login);
router.get("/", controller.tokenIsActive);
router.post("/logout", controller.logout);

module.exports = router;
