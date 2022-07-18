const { body } = require("express-validator");

module.exports = [
  body("firstName").notEmpty().withMessage("First name is required."),
  body("lastName").notEmpty().withMessage("Last name is required."),
  body("email")
    .notEmpty()
    .withMessage("Email is required.")
    .isEmail()
    .withMessage("Not a email format"),
  body("gender").notEmpty().withMessage("Gender is required."),
  body("password").notEmpty().withMessage("Password is required."),
];
