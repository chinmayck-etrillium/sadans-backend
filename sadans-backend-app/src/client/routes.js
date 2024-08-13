const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Api route 1");
});

module.exports = router;
