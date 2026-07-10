import Papa from "papaparse";
import * as XLSX from "xlsx";

// Parses a CSV File object -> { columns, rows }
export function parseCSVFile(file) {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const rows = results.data;
        const columns = results.meta.fields || [];
        resolve({ columns, rows });
      },
      error: (err) => reject(err),
    });
  });
}

// Parses an Excel File object -> { columns, rows }
export function parseExcelFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const rows = XLSX.utils.sheet_to_json(sheet, { defval: "" });
        const columns = rows.length ? Object.keys(rows[0]) : [];
        resolve({ columns, rows });
      } catch (err) {
        reject(err);
      }
    };
    reader.onerror = (err) => reject(err);
    reader.readAsArrayBuffer(file);
  });
}

// Auto-detects file type and parses accordingly
export function parseFile(file) {
  const ext = file.name.split(".").pop().toLowerCase();
  if (ext === "csv") return parseCSVFile(file);
  if (ext === "xlsx" || ext === "xls") return parseExcelFile(file);
  return Promise.reject(new Error("Unsupported file type"));
}