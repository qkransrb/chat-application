const express = require("express");
const { index, create, messages, deleteChat } = require("../controllers/chat");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

router.get("/", authMiddleware, index);
router.get("/messages", authMiddleware, messages);
router.post("/create", authMiddleware, create);
router.delete("/:id", authMiddleware, deleteChat);

module.exports = router;
