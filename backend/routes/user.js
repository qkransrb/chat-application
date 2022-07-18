const express = require("express");
const { update } = require("../controllers/user");
const authMiddleware = require("../middlewares/authMiddleware");
const fileUploadMiddleware = require("../middlewares/fileUploadMiddleware");
const validationMiddleware = require("../middlewares/validationMiddleware");
const updateValidator = require("../validators/user/updateValidator");
const router = express.Router();

router.post(
  "/update",
  authMiddleware,
  fileUploadMiddleware,
  updateValidator,
  validationMiddleware,
  update
);

module.exports = router;
