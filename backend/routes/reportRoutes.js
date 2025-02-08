const express = require("express");
const { uploadFile, getReports, upload } = require("../controllers/reportController");

const router = express.Router();

router.post("/upload", upload.single("file"), uploadFile);
router.get("/reports", getReports);

module.exports = router;
