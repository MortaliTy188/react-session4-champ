const express = require("express");
const {
  getDocuments,
  createDocument,
} = require("../controllers/documentController");
const authenticateJWT = require("../middlewares/authenticateJWT");
const router = express.Router();

router.get("/Documents", authenticateJWT, getDocuments);
router.post("/Documents", authenticateJWT, createDocument);

module.exports = router;
