const { body } = require("express-validator");

module.exports = [
  body("email")
    .notEmpty()
    .withMessage("Email is required.")
    .isEmail()
    .withMessage("Not a email format"),
  body("password").notEmpty().withMessage("Password is required."),
];
