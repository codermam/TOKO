const express = require("express");
const multer = require("multer");
const path = require("path");
const router = express.Router();
const uploadController = require("../controllers/uploadController");

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  fileFilter: (req, file, cb) => {
    const allowed = [".csv", ".xlsx", ".xls"];
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowed.includes(ext)) cb(null, true);
    else cb(new Error("Only CSV and Excel files are allowed"));
  },
});

router.post("/", upload.single("file"), uploadController.uploadFile);
router.post("/manual", uploadController.saveManualData);
router.get("/", uploadController.getAllDatasets);
router.get("/:id", uploadController.getDatasetById);

module.exports = router;