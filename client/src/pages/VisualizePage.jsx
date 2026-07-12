import { useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";

import {
  Columns3,
  Rows3,
  UploadCloud,
  Sparkles,
} from "lucide-react";

import { useData } from "../context/DataContext";

import ChartSelector from "../components/ChartSelector";
import ChartRenderer from "../components/ChartRenderer";
import ExportButtons from "../components/ExportButtons";
import DataTable from "../components/DataTable";


export default function VisualizePage() {


const {
  columns,
  rows,
  datasetName,
}=useData();



const [xKey,setXKey]=useState("");
const [yKey,setYKey]=useState("");

const [xLabel,setXLabel]=useState("");
const [yLabel,setYLabel]=useState("");

const [chartType,setChartType]=useState("Bar");


const chartRef = useRef(null);





const stats = useMemo(()=>{


return [

{
title:"Rows",
value:rows.length,
icon:Rows3,
color:"text-primary"
},

{
title:"Columns",
value:columns.length,
icon:Columns3,
color:"text-secondary"
},

];


},[rows,columns]);







function handleXChange(value){

setXKey(value);
setXLabel(value);

}



function handleYChange(value){

setYKey(value);
setYLabel(value);

}







if(!rows.length){


return (

<div className="
min-h-[70vh]
flex
items-center
justify-center
px-6
">


<div className="
card
max-w-lg
p-10
text-center
animate-fade
">


<div className="
mx-auto
mb-5
w-20
h-20
rounded-3xl
bg-primary/10
flex
items-center
justify-center
text-primary
">


<UploadCloud size={40}/>


</div>



<h1 className="
text-3xl
font-display
font-bold
">

No dataset loaded

</h1>



<p className="
opacity-60
mt-3
mb-7
">

Upload a CSV file or add data to start creating beautiful visualizations.

</p>



<Link

to="/upload"

className="
btn
btn-primary
"

>

Upload Data

</Link>


</div>


</div>

);


}







return (

<main className="
max-w-7xl
mx-auto
px-4
sm:px-6
py-10
space-y-8
">





{/* Header */}

<section className="card p-6 bg-gradient-to-br from-primary/10 via-base-100 to-secondary/10 border border-base-300">

  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

    <div>

      <div className="flex items-center gap-3 mb-4">

        <div className="badge badge-primary badge-outline">
          Dataset
        </div>

        <div className="flex items-center gap-2 text-sm text-success font-medium">

          <span className="w-2 h-2 rounded-full bg-success animate-pulse"></span>

          Ready

        </div>

      </div>


      <h1 className="text-4xl font-display font-bold break-all">

        {datasetName}

      </h1>


      <p className="opacity-60 mt-2">

        Interactive analytics workspace for exploring and visualizing your data

      </p>


    </div>



    <div className="flex flex-col sm:flex-row gap-3">


      <div className="px-5 py-4 rounded-2xl bg-base-100 border border-base-300 shadow-sm min-w-[150px]">

        <p className="text-xs uppercase tracking-wider opacity-60">
          Status
        </p>

        <p className="font-bold text-primary mt-1">
          Live Analysis
        </p>

      </div>




    </div>


  </div>

</section>

{/* Statistics */}


<section className="
grid
grid-cols-1
sm:grid-cols-2
gap-5
max-w-3xl
">


{

stats.map((item)=>{


const Icon=item.icon;


return (

<div

key={item.title}

className="
card
p-5
hover:shadow-glow
transition
duration-300
"


>


<div className="
flex
items-center
justify-between
">


<div>


<p className="
text-sm
opacity-60
">

{item.title}

</p>


<h2 className="
text-3xl
font-bold
mt-1
">

{item.value}

</h2>


</div>



<Icon

size={35}

className={item.color}

/>


</div>


</div>

)

})

}


</section>








{/* Table */}


<section>


<DataTable

columns={columns}

rows={rows}

/>


</section>









{/* Chart Controls */}


<section>


<ChartSelector

columns={columns}

xKey={xKey}

yKey={yKey}

xLabel={xLabel}

yLabel={yLabel}

chartType={chartType}

onXChange={handleXChange}

onYChange={handleYChange}

onXLabelChange={setXLabel}

onYLabelChange={setYLabel}

onTypeChange={setChartType}

/>


</section>









{/* Chart */}


<section>


<ChartRenderer

ref={chartRef}

data={rows}

xKey={xKey}

yKey={yKey}

xLabel={xLabel}

yLabel={yLabel}

chartType={chartType}

/>


</section>







{/* Export */}


<section>


<ExportButtons

chartRef={chartRef}

/>


</section>







</main>


);

}