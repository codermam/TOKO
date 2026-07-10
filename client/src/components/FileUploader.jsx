import { useState } from "react";
import { parseFile } from "../utils/csvParser";
import { useData } from "../context/DataContext";

export default function FileUploader({ onDone }) {
  const { setDataset } = useData();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState("");

  const handleFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setError("");
    setLoading(true);
    setFileName(file.name);
    try {
      const { columns, rows } = await parseFile(file);
      if (!columns.length || !rows.length) {
        throw new Error("That file doesn't have any readable rows.");
      }
      setDataset(columns, rows, file.name);
      if (onDone) onDone();
    } catch (err) {
      setError(err.message || "Couldn't read that file. Try a CSV or Excel export.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card bg-base-100 corner-marks p-8 shadow-sm w-full">
      <label
        htmlFor="file-input"
        className="flex flex-col items-center justify-center border-2 border-dashed border-pine/40 rounded p-10 cursor-pointer hover:border-pine hover:bg-pine/5 transition-colors"
      >
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" className="mb-3">
          <path
            d="M12 3v12m0-12l-4 4m4-4l4 4M4 17v2a2 2 0 002 2h12a2 2 0 002-2v-2"
            stroke="#2F6F5E"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span className="font-display font-semibold">Drop a CSV or Excel file</span>
        <span className="font-mono-data text-xs text-ink/50 mt-1">
          or click to browse — .csv, .xlsx, .xls
        </span>
        <input
          id="file-input"
          type="file"
          accept=".csv,.xlsx,.xls"
          onChange={handleFile}
          className="hidden"
        />
      </label>

      {fileName && !error && (
        <p className="font-mono-data text-xs text-ink/60 mt-3">
          {loading ? "Reading" : "Loaded"} — {fileName}
        </p>
      )}
      {error && <p className="text-brick text-sm mt-3">{error}</p>}
    </div>
  );
}