const express = require("express");
const controller = require("./controller");
const router = express.Router();

router.get("/:tableName", controller.selectClientsTable);
router.get("/", controller.selectTransactionsTable);


module.exports = router;
