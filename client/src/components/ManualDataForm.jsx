import { useState } from "react";
import { useData } from "../context/DataContext";

export default function ManualDataForm({ onDone }) {
  const { setDataset } = useData();
  const [columns, setColumns] = useState(["Month", "Sales"]);
  const [rows, setRows] = useState([
    { Month: "Jan", Sales: 1200 },
    { Month: "Feb", Sales: 1500 },
  ]);

  const updateCell = (rowIndex, col, value) => {
    const updated = [...rows];
    updated[rowIndex] = { ...updated[rowIndex], [col]: value };
    setRows(updated);
  };

  const addRow = () => {
    const emptyRow = {};
    columns.forEach((c) => (emptyRow[c] = ""));
    setRows([...rows, emptyRow]);
  };

  const removeRow = (index) => setRows(rows.filter((_, i) => i !== index));

  const addColumn = () => {
    const name = prompt("Name this column:");
    if (!name || columns.includes(name)) return;
    setColumns([...columns, name]);
    setRows(rows.map((r) => ({ ...r, [name]: "" })));
  };

  const removeColumn = (col) => {
    setColumns(columns.filter((c) => c !== col));
    setRows(
      rows.map((r) => {
        const copy = { ...r };
        delete copy[col];
        return copy;
      })
    );
  };

  const handleSubmit = () => {
    setDataset(columns, rows, "Manual Entry");
    if (onDone) onDone();
  };

  return (
    <div className="card bg-base-100 corner-marks p-8 shadow-sm w-full overflow-x-auto">
      <table className="table table-zebra">
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col} className="font-mono-data text-xs uppercase tracking-wide">
                <div className="flex items-center gap-2">
                  {col}
                  <button
                    onClick={() => removeColumn(col)}
                    className="btn btn-xs btn-ghost text-brick"
                    aria-label={`Remove column ${col}`}
                  >
                    ✕
                  </button>
                </div>
              </th>
            ))}
            <th></th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rIndex) => (
            <tr key={rIndex}>
              {columns.map((col) => (
                <td key={col}>
                  <input
                    className="input input-bordered input-sm w-full font-mono-data"
                    value={row[col] ?? ""}
                    onChange={(e) => updateCell(rIndex, col, e.target.value)}
                  />
                </td>
              ))}
              <td>
                <button
                  onClick={() => removeRow(rIndex)}
                  className="btn btn-xs btn-ghost text-brick"
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex gap-2 mt-5">
        <button onClick={addRow} className="btn btn-sm btn-outline font-mono-data">
          + Row
        </button>
        <button onClick={addColumn} className="btn btn-sm btn-outline btn-secondary font-mono-data">
          + Column
        </button>
        <button onClick={handleSubmit} className="btn btn-sm btn-primary ml-auto font-mono-data">
          Use this data
        </button>
      </div>
    </div>
  );
}