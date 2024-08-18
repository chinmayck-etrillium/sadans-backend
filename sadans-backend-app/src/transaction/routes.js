const express = require("express");
const router = express.Router();

const controller = require("./controller");

router.get("/", controller.getAllTransactions);
router.get("/:name", controller.getTransactionsByName);
router.get("/total-credit/:name", controller.totalRemainingCredit);

module.exports = router;
