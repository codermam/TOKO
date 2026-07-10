const Dataset = require("../models/Dataset");

// Returns dataset formatted for a specific chart (x/y key selection)
exports.getChartData = async (req, res) => {
  try {
    const { id } = req.params;
    const { xKey, yKey } = req.query;

    const dataset = await Dataset.findById(id);
    if (!dataset) return res.status(404).json({ message: "Dataset not found" });

    if (!xKey || !yKey) {
      return res.status(400).json({ message: "xKey and yKey query params are required" });
    }

    const chartData = dataset.rows.map((row) => ({
      [xKey]: row[xKey],
      [yKey]: Number(row[yKey]) || row[yKey],
    }));

    res.json({ chartData, columns: dataset.columns });
  } catch (err) {
    res.status(500).json({ message: "Error building chart data" });
  }
};