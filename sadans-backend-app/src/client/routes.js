const express = require("express");
const router = express.Router();
const controller = require("./controller");

router.get("/", controller.getAllClients);
router.post("/", controller.createClient);
router.put("/:name", controller.updateClientName);
router.delete("/", controller.deleteClient);

module.exports = router;
