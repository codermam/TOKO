const fs = require("fs");
const csv = require("csv-parser");
const XLSX = require("xlsx");
const Dataset = require("../models/Dataset");

// Parse CSV file from disk
function parseCSV(filePath) {
  return new Promise((resolve, reject) => {
    const rows = [];
    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (row) => rows.push(row))
      .on("end", () => resolve(rows))
      .on("error", (err) => reject(err));
  });
}

// Parse Excel file from disk
function parseExcel(filePath) {
  const workbook = XLSX.readFile(filePath);
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  return XLSX.utils.sheet_to_json(sheet);
}

exports.uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const filePath = req.file.path;
    const ext = req.file.originalname.split(".").pop().toLowerCase();

    let rows = [];
    let source = "csv";

    if (ext === "csv") {
      rows = await parseCSV(filePath);
      source = "csv";
    } else if (ext === "xlsx" || ext === "xls") {
      rows = parseExcel(filePath);
      source = "excel";
    } else {
      fs.unlinkSync(filePath);
      return res.status(400).json({ message: "Unsupported file type" });
    }

    // cleanup uploaded temp file
    fs.unlinkSync(filePath);

    if (!rows.length) {
      return res.status(400).json({ message: "File is empty or unreadable" });
    }

    const columns = Object.keys(rows[0]);

    const dataset = await Dataset.create({
      name: req.file.originalname,
      columns,
      rows,
      source,
    });

    res.status(201).json(dataset);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error processing file", error: err.message });
  }
};

exports.getAllDatasets = async (req, res) => {
  try {
    const datasets = await Dataset.find().sort({ createdAt: -1 }).select("-rows");
    res.json(datasets);
  } catch (err) {
    res.status(500).json({ message: "Error fetching datasets" });
  }
};

exports.getDatasetById = async (req, res) => {
  try {
    const dataset = await Dataset.findById(req.params.id);
    if (!dataset) return res.status(404).json({ message: "Dataset not found" });
    res.json(dataset);
  } catch (err) {
    res.status(500).json({ message: "Error fetching dataset" });
  }
};

exports.saveManualData = async (req, res) => {
  try {
    const { name, columns, rows } = req.body;
    if (!columns || !rows || !rows.length) {
      return res.status(400).json({ message: "Columns and rows are required" });
    }
    const dataset = await Dataset.create({
      name: name || "Manual Entry",
      columns,
      rows,
      source: "manual",
    });
    res.status(201).json(dataset);
  } catch (err) {
    res.status(500).json({ message: "Error saving manual data" });
  }
};