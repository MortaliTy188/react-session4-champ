const express = require("express");
const { getComments, addComment } = require("../controllers/commentController");
const authenticateJWT = require("../middlewares/authenticateJWT");
const router = express.Router();

router.get("/Document/:documentId/Comments", authenticateJWT, getComments);
router.post("/Document/:documentId/Comment", authenticateJWT, addComment);

module.exports = router;
