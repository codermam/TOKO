import {
  BarChart3,
  LineChart,
  PieChart,
  AreaChart,
  ScatterChart,
  ChartNoAxesCombined,
  Sigma,
} from "lucide-react";


const CHART_TYPES = [
  {
    name: "Bar",
    icon: BarChart3,
    description: "Compare values",
  },
  {
    name: "Line",
    icon: LineChart,
    description: "Show trends",
  },
  {
    name: "Area",
    icon: AreaChart,
    description: "Visualize changes",
  },
  {
    name: "Pie",
    icon: PieChart,
    description: "Show proportions",
  },
  {
    name: "Scatter",
    icon: ScatterChart,
    description: "Find patterns",
  },
  {
    name: "Doughnut",
    icon: ChartNoAxesCombined,
    description: "Part of whole",
  },
  {
    name: "Exponential",
    icon: Sigma,
    description: "Growth curve",
  },
  {
    name: "Distribution",
    icon: ChartNoAxesCombined,
    description: "Frequency",
  },
];



export default function ChartSelector({
  columns,
  xKey,
  yKey,
  xLabel,
  yLabel,
  chartType,
  onXChange,
  onYChange,
  onXLabelChange,
  onYLabelChange,
  onTypeChange,
}) {


return (

<section className="
  card
  p-6
  animate-fade
">


{/* Header */}

<div className="
  flex
  items-center
  justify-between
  mb-6
">


<div>


<p className="
 text-xs
 uppercase
 tracking-widest
 font-mono-data
 opacity-50
 mb-2
">
Chart Configuration
</p>


<h2 className="
 text-2xl
 font-display
 font-bold
">
Build your visualization
</h2>


</div>



<div className="
 badge
 badge-primary
 badge-outline
">
Step 02
</div>


</div>





{/* Axis Selection */}


<div className="
grid
grid-cols-1
md:grid-cols-2
gap-5
">



{/* X Axis */}


<div className="
rounded-2xl
border
border-base-300
p-5
bg-base-200/40
">


<label className="
text-xs
font-bold
uppercase
tracking-wider
opacity-60
">
X Axis
</label>



<select

className="
select
select-bordered
w-full
mt-3
"

value={xKey}

onChange={(e)=>
onXChange(e.target.value)
}

>

<option value="">
Choose column
</option>


{
columns.map(column=>(

<option
key={column}
value={column}
>
{column}
</option>

))
}


</select>





{xKey && (

<input

className="
input
input-bordered
w-full
mt-3
"

placeholder="Custom X label"

value={xLabel}

onChange={(e)=>
onXLabelChange(e.target.value)
}

/>

)}


</div>





{/* Y Axis */}


<div className="
rounded-2xl
border
border-base-300
p-5
bg-base-200/40
">


<label className="
text-xs
font-bold
uppercase
tracking-wider
opacity-60
">
Y Axis
</label>



<select

className="
select
select-bordered
w-full
mt-3
"

value={yKey}

onChange={(e)=>
onYChange(e.target.value)
}

>


<option value="">
Choose column
</option>


{
columns.map(column=>(

<option
key={column}
value={column}
>
{column}
</option>

))
}


</select>




{yKey && (

<input

className="
input
input-bordered
w-full
mt-3
"

placeholder="Custom Y label"

value={yLabel}

onChange={(e)=>
onYLabelChange(e.target.value)
}

/>

)}


</div>


</div>





{/* Chart Types */}



<div className="mt-8">


<div className="
flex
items-center
justify-between
mb-4
">


<h3 className="
font-semibold
">
Chart Type
</h3>


<span className="
text-xs
opacity-50
">
Select visualization style
</span>


</div>




<div className="
grid
grid-cols-2
sm:grid-cols-3
lg:grid-cols-4
gap-3
">


{
CHART_TYPES.map((chart)=>{


const Icon = chart.icon;

const active =
chartType === chart.name;


return (

<button

key={chart.name}

onClick={() =>
onTypeChange(chart.name)
}

className={`
p-4
rounded-2xl
border
text-left
transition-all
duration-300
hover:-translate-y-1

${
active
?
"border-primary bg-primary/10 shadow-glow"
:
"border-base-300 bg-base-100"
}

`}

>



<div className="
flex
items-center
gap-3
">


<div className={`
p-2
rounded-xl

${
active
?
"bg-primary text-primary-content"
:
"bg-base-300"
}

`}>

<Icon size={20}/>

</div>



<div>

<p className="
font-semibold
text-sm
">
{chart.name}
</p>


<p className="
text-xs
opacity-60
">
{chart.description}
</p>


</div>



</div>


</button>

)

})

}


</div>


</div>



</section>


);


}