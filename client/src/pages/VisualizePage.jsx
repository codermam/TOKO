import { useRef, useState } from "react";
import { useData } from "../context/DataContext";
import ChartSelector from "../components/ChartSelector";
import ChartRenderer from "../components/ChartRenderer";
import ExportButtons from "../components/ExportButtons";
import { Link } from "react-router-dom";

export default function VisualizePage() {
  const { columns, rows, datasetName } = useData();
  const [xKey, setXKey] = useState("");
  const [yKey, setYKey] = useState("");
  const [chartType, setChartType] = useState("Bar");
  const chartRef = useRef(null);

  if (!rows.length) {
    return (
      <div className="max-w-2xl mx-auto text-center mt-24 px-6">
        <p className="font-display text-xl font-semibold mb-2">No data yet</p>
        <p className="text-ink/60 mb-6">
          Upload a file or type in some numbers to see a chart here.
        </p>
        <Link to="/upload" className="btn btn-primary font-mono-data">
          Add data
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto mt-12 px-6 flex flex-col gap-6">
      <div>
        <p className="font-mono-data text-xs tracking-widest text-pine uppercase mb-2">
          Dataset
        </p>
        <h2 className="font-display text-3xl font-bold">{datasetName}</h2>
      </div>

      <div className="card bg-base-100 corner-marks p-4 shadow-sm overflow-x-auto max-h-64">
        <table className="table table-zebra table-sm font-mono-data">
          <thead>
            <tr>{columns.map((c) => <th key={c}>{c}</th>)}</tr>
          </thead>
          <tbody>
            {rows.slice(0, 10).map((row, i) => (
              <tr key={i}>
                {columns.map((c) => <td key={c}>{row[c]}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ChartSelector
        columns={columns}
        xKey={xKey}
        yKey={yKey}
        chartType={chartType}
        onXChange={setXKey}
        onYChange={setYKey}
        onTypeChange={setChartType}
      />

      <ChartRenderer ref={chartRef} data={rows} xKey={xKey} yKey={yKey} chartType={chartType} />

      <ExportButtons chartRef={chartRef} />
    </div>
  );
}