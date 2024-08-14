const express = require("express");
const router = express.Router();
const controller = require("./controller");

router.get("/", controller.getAllClients);
router.post("/", controller.createClient);

module.exports = router;
