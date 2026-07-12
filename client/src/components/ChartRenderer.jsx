import { forwardRef } from "react";

import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  ScatterChart,
  Scatter,
  ComposedChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import {
  computeExponentialFit,
  computeDistribution,
} from "../utils/chartMath";


const COLORS = [
  "#2563eb",
  "#14b8a6",
  "#f59e0b",
  "#ef4444",
  "#8b5cf6",
  "#06b6d4",
  "#84cc16",
];


const CHART_MARGIN = {
  top: 30,
  right: 30,
  left: 50,
  bottom: 70,
};


function CustomTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;

  return (
    <div
      style={{
        background: "#ffffff",
        color: "#111827",
        padding: "12px",
        borderRadius: "12px",
        boxShadow: "0 10px 30px rgba(0,0,0,.15)",
        border: "1px solid #e5e7eb",
      }}
    >
      {payload.map((item, index) => (
        <div
          key={index}
          className="flex justify-between gap-5 text-sm"
        >
          <span>{item.name}</span>
          <b>{item.value}</b>
        </div>
      ))}
    </div>
  );
}


const ChartRenderer = forwardRef(
(
{
  data,
  xKey,
  yKey,
  xLabel,
  yLabel,
  chartType,
},
ref
) => {


if (!data || !data.length || !xKey || !yKey) {
  return (
    <div className="card p-12 text-center">
      <div className="text-6xl mb-4">📊</div>
      <h3 className="text-xl font-bold">
        Ready to visualize
      </h3>
      <p className="opacity-60 mt-2">
        Select X and Y columns to create your chart.
      </p>
    </div>
  );
}


const xAxisLabel = xLabel || xKey;
const yAxisLabel = yLabel || yKey;


const X_AXIS = (
  <XAxis
    dataKey={xKey}
    label={{
      value: xAxisLabel,
      position: "bottom",
      offset: 25,
      fill: "#111827",
      fontSize: 14,
    }}
  />
);


const Y_AXIS = (
  <YAxis
    label={{
      value: yAxisLabel,
      angle: -90,
      position: "insideLeft",
      offset: -10,
      fill: "#111827",
      fontSize: 14,
    }}
  />
);


function renderChart() {

switch(chartType) {


case "Bar":
return (
  <BarChart data={data} margin={CHART_MARGIN}>
    <CartesianGrid strokeDasharray="4 4" />
    {X_AXIS}
    {Y_AXIS}
    <Tooltip content={<CustomTooltip />} />
    <Legend />
    <Bar
      dataKey={yKey}
      fill={COLORS[0]}
      radius={[8,8,0,0]}
    />
  </BarChart>
);



case "Line":
return (
  <LineChart data={data} margin={CHART_MARGIN}>
    <CartesianGrid strokeDasharray="4 4" />
    {X_AXIS}
    {Y_AXIS}
    <Tooltip content={<CustomTooltip />} />
    <Legend />
    <Line
      type="monotone"
      dataKey={yKey}
      stroke={COLORS[1]}
      strokeWidth={3}
      dot={{
        r:5,
        fill:COLORS[0]
      }}
    />
  </LineChart>
);



case "Area":
return (
  <AreaChart data={data} margin={CHART_MARGIN}>
    <CartesianGrid strokeDasharray="4 4" />
    {X_AXIS}
    {Y_AXIS}
    <Tooltip content={<CustomTooltip />} />
    <Area
      type="monotone"
      dataKey={yKey}
      stroke={COLORS[0]}
      fill={COLORS[0]}
      fillOpacity={0.25}
    />
  </AreaChart>
);



case "Scatter":
return (
  <ScatterChart margin={CHART_MARGIN}>
    <CartesianGrid strokeDasharray="4 4" />

    <XAxis
      dataKey={xKey}
      label={{
        value:xAxisLabel,
        position:"bottom",
        offset:25
      }}
    />

    <YAxis
      dataKey={yKey}
      label={{
        value:yAxisLabel,
        angle:-90,
        position:"insideLeft"
      }}
    />

    <Tooltip content={<CustomTooltip />} />

    <Scatter
      data={data}
      fill={COLORS[2]}
    />
  </ScatterChart>
);



case "Pie":
case "Doughnut":
return (
  <PieChart>

    <Tooltip content={<CustomTooltip />} />

    <Legend />

    <Pie
      data={data}
      dataKey={yKey}
      nameKey={xKey}
      cx="50%"
      cy="50%"
      outerRadius={140}
      innerRadius={
        chartType === "Doughnut" ? 80 : 0
      }
      label
    >
      {data.map((_,index)=>(
        <Cell
          key={index}
          fill={COLORS[index % COLORS.length]}
        />
      ))}
    </Pie>

  </PieChart>
);



case "Exponential":
{
const {
  fittedData,
  a,
  b
} = computeExponentialFit(
  data,
  xKey,
  yKey
);


if(!fittedData.length) {
  return (
    <div className="flex items-center justify-center h-full">
      <p>Need positive numeric values.</p>
    </div>
  );
}


return (
  <ComposedChart
    data={fittedData}
    margin={CHART_MARGIN}
  >
    <CartesianGrid strokeDasharray="4 4" />
    {X_AXIS}
    {Y_AXIS}
    <Tooltip content={<CustomTooltip />} />
    <Legend />

    <Bar
      dataKey={yKey}
      fill={COLORS[0]}
    />

    <Line
      dataKey="fitted"
      stroke={COLORS[3]}
      strokeWidth={3}
      dot={false}
      name={`y=${a.toFixed(2)}e^${b.toFixed(3)}x`}
    />

  </ComposedChart>
);

}



case "Distribution":
{
const {
  bins
} = computeDistribution(
  data,
  yKey,
  12
);


return (
  <ComposedChart
    data={bins}
    margin={CHART_MARGIN}
  >

    <CartesianGrid strokeDasharray="4 4" />

    <XAxis
      dataKey="binLabel"
      label={{
        value:xAxisLabel,
        position:"bottom",
        offset:25
      }}
    />

    <YAxis
      label={{
        value:yAxisLabel,
        angle:-90,
        position:"insideLeft"
      }}
    />

    <Tooltip content={<CustomTooltip />} />

    <Legend />

    <Bar
      dataKey="count"
      fill={COLORS[0]}
    />

    <Line
      dataKey="gaussian"
      stroke={COLORS[3]}
      strokeWidth={3}
    />

  </ComposedChart>
);

}


default:
return null;

}

}



return (
<div
  ref={ref}
  id="chart-export-area"
  style={{
    background:"#ffffff",
    color:"#111827",
    padding:"24px",
    borderRadius:"16px"
  }}
  className="card p-6 animate-fade"
>

<div className="flex justify-between items-center mb-5">

<div>

<h2 className="text-xl font-bold">
{chartType} Chart
</h2>

<p className="text-sm opacity-60">
{xAxisLabel} vs {yAxisLabel}
</p>

</div>

</div>


<div
style={{
  width:"100%",
  height:500
}}
>

<ResponsiveContainer
  width="100%"
  height="100%"
>
{renderChart()}
</ResponsiveContainer>

</div>

</div>
);

});


export default ChartRenderer;