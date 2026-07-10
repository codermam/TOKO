import { Link } from "react-router-dom";

const POINTS = [
  [20, 260],
  [120, 200],
  [220, 220],
  [320, 140],
  [420, 160],
  [520, 60],
];

export default function Dashboard() {
  const pathD = `M${POINTS.map((p) => p.join(",")).join(" L")}`;

  return (
    <div className="max-w-5xl mx-auto mt-14 px-6">
      <div className="grid md:grid-cols-2 gap-10 items-center">
        {/* Left: copy */}
        <div>
          <p className="font-mono-data text-xs tracking-widest text-pine uppercase mb-3">
            Data → Chart → Export
          </p>
          <h1 className="font-display text-5xl font-bold leading-tight mb-5">
            Plot your numbers,
            <br /> not your patience.
          </h1>
          <p className="text-base text-ink/70 mb-8 max-w-md">
            Upload a spreadsheet or type your data in by hand. Toko draws the
            chart, and you take it wherever you need it — PNG, PDF, or print.
          </p>
          <div className="flex gap-3">
            <Link to="/upload" className="btn btn-primary font-mono-data">
              Add your data
            </Link>
            <Link to="/visualize" className="btn btn-outline font-mono-data">
              See a chart
            </Link>
          </div>
        </div>

        {/* Right: signature — self-drawing plot */}
        <div className="card bg-base-100 corner-marks p-6 shadow-sm">
          <svg viewBox="0 0 560 300" className="w-full h-auto">
            {/* axes */}
            <line x1="20" y1="20" x2="20" y2="270" stroke="#D8DCE3" strokeWidth="1" />
            <line x1="20" y1="270" x2="540" y2="270" stroke="#D8DCE3" strokeWidth="1" />

            {/* plotted line */}
            <path
              d={pathD}
              fill="none"
              stroke="#2F6F5E"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="plot-line"
            />

            {/* data points */}
            {POINTS.map(([x, y], i) => (
              <circle
                key={i}
                cx={x}
                cy={y}
                r="6"
                fill="#E0A458"
                stroke="#1B2430"
                strokeWidth="1.5"
                className="plot-dot"
                style={{ animationDelay: `${1.6 + i * 0.15}s` }}
              />
            ))}
          </svg>
          <p className="font-mono-data text-xs text-ink/50 mt-3 text-center">
            SAMPLE — MONTHLY SALES
          </p>
        </div>
      </div>
    </div>
  );
}