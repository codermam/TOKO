const CHART_TYPES = ["Bar", "Line", "Pie", "Area", "Scatter", "Doughnut"];

export default function ChartSelector({
  columns,
  xKey,
  yKey,
  chartType,
  onXChange,
  onYChange,
  onTypeChange,
}) {
  return (
    <div className="card bg-base-100 corner-marks p-6 shadow-sm w-full">
      <p className="font-mono-data text-xs tracking-widest text-pine uppercase mb-4">
        02 — Configure chart
      </p>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="form-control w-full md:w-1/3">
          <label className="label">
            <span className="label-text font-mono-data text-xs uppercase">X — Axis</span>
          </label>
          <select
            className="select select-bordered"
            value={xKey}
            onChange={(e) => onXChange(e.target.value)}
          >
            <option value="">Select column</option>
            {columns.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        <div className="form-control w-full md:w-1/3">
          <label className="label">
            <span className="label-text font-mono-data text-xs uppercase">Y — Axis</span>
          </label>
          <select
            className="select select-bordered"
            value={yKey}
            onChange={(e) => onYChange(e.target.value)}
          >
            <option value="">Select column</option>
            {columns.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        <div className="form-control w-full md:w-1/3">
          <label className="label">
            <span className="label-text font-mono-data text-xs uppercase">Chart type</span>
          </label>
          <select
            className="select select-bordered"
            value={chartType}
            onChange={(e) => onTypeChange(e.target.value)}
          >
            {CHART_TYPES.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}