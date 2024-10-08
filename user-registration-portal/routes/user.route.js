const express = require("express");
const router = express.Router();
const controllers = require("../controllers/users.controller");
const auth = require("../middleware/auth");

router.post("/register", controllers.registerUser);
router.post("/login", controllers.loginUser);
router.get("/user", auth, controllers.showUserName);

module.exports = router;
