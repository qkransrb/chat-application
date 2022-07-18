const express = require("express");
const { login, register } = require("../controllers/auth");
const validationMiddleware = require("../middlewares/validationMiddleware");
const loginValidator = require("../validators/auth/loginValidator");
const registerValidator = require("../validators/auth/registerValidator");
const router = express.Router();

router.post("/login", loginValidator, validationMiddleware, login);
router.post("/register", registerValidator, validationMiddleware, register);

module.exports = router;
