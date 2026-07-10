import { forwardRef } from "react";
import {
  BarChart, Bar,
  LineChart, Line,
  PieChart, Pie, Cell,
  AreaChart, Area,
  ScatterChart, Scatter,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#2F6F5E", "#E0A458", "#B33F3F", "#3D7FBF", "#7B5EA7", "#3E8E8E", "#8A8F3D"];

const ChartRenderer = forwardRef(({ data, xKey, yKey, chartType }, ref) => {
  if (!data || !data.length || !xKey || !yKey) {
    return (
      <div className="card bg-base-100 corner-marks p-10 text-center w-full">
        <p className="font-mono-data text-sm text-ink/60">
          Pick an X-axis and Y-axis above to draw the chart.
        </p>
      </div>
    );
  }

  const renderChart = () => {
    switch (chartType) {
      case "Bar":
        return (
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#D8DCE3" />
            <XAxis dataKey={xKey} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey={yKey} fill={COLORS[0]} radius={[3, 3, 0, 0]} />
          </BarChart>
        );
      case "Line":
        return (
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#D8DCE3" />
            <XAxis dataKey={xKey} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey={yKey} stroke={COLORS[0]} strokeWidth={2.5} dot={{ fill: COLORS[1], r: 4 }} />
          </LineChart>
        );
      case "Area":
        return (
          <AreaChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#D8DCE3" />
            <XAxis dataKey={xKey} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Area type="monotone" dataKey={yKey} stroke={COLORS[0]} fill={COLORS[0]} fillOpacity={0.25} />
          </AreaChart>
        );
      case "Scatter":
        return (
          <ScatterChart>
            <CartesianGrid strokeDasharray="3 3" stroke="#D8DCE3" />
            <XAxis dataKey={xKey} name={xKey} />
            <YAxis dataKey={yKey} name={yKey} />
            <Tooltip cursor={{ strokeDasharray: "3 3" }} />
            <Legend />
            <Scatter data={data} fill={COLORS[0]} />
          </ScatterChart>
        );
      case "Pie":
      case "Doughnut":
        return (
          <PieChart>
            <Tooltip />
            <Legend />
            <Pie
              data={data}
              dataKey={yKey}
              nameKey={xKey}
              cx="50%"
              cy="50%"
              outerRadius={140}
              innerRadius={chartType === "Doughnut" ? 80 : 0}
              label
            >
              {data.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        );
      default:
        return <div>Unsupported chart type</div>;
    }
  };

  return (
    <div ref={ref} className="card bg-base-100 corner-marks p-6 shadow-sm w-full" id="chart-export-area">
      <div key={`${chartType}-${xKey}-${yKey}`} className="chart-enter">
        <ResponsiveContainer width="100%" height={420}>
          {renderChart()}
        </ResponsiveContainer>
      </div>
    </div>
  );
});

export default ChartRenderer;