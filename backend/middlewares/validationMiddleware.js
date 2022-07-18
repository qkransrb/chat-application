const { validationResult } = require("express-validator");

module.exports = (req, res, next) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    next();
  } else {
    return res.status(400).json({
      message: `${errors.array()[0].param} - ${errors.array()[0].msg}`,
    });
  }
};
