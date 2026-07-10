const express = require("express");
const router = express.Router();
const chartController = require("../controllers/chartController");

router.get("/:id", chartController.getChartData);

module.exports = router;