const express = require("express");
const router = express.Router();
const controller = require("./controller");

router.get("/", controller.getAllClients);
router.get("/:name", controller.getClientIdByName);
router.post("/", controller.createClient);
router.put("/:name", controller.updateClientName);
router.delete("/", controller.deleteClient);
router.get("/total/clients", controller.totalClients);
router.get("/details/:name", controller.getCompleteClientDetails);

module.exports = router;
