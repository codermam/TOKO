import { useState } from "react";
import {
  FileImage,
  FileText,
  Loader2,
} from "lucide-react";

import html2canvas from "html2canvas";
import jsPDF from "jspdf";


export default function ExportButtons({ chartRef }) {


  const [loading,setLoading] = useState("");



  function replaceOKLCH(doc){


    const elements =
      doc.querySelectorAll("*");


    elements.forEach((el)=>{


      const style =
        window.getComputedStyle(el);



      if(
        style.backgroundColor.includes("oklch")
      ){

        el.style.backgroundColor =
          "#ffffff";

      }



      if(
        style.color.includes("oklch")
      ){

        el.style.color =
          "#111827";

      }



      if(
        style.borderColor.includes("oklch")
      ){

        el.style.borderColor =
          "#e5e7eb";

      }



    });


  }






  async function captureChart(){


    if(!chartRef?.current){

      throw new Error(
        "Chart not found"
      );

    }



    const canvas =
      await html2canvas(
        chartRef.current,
        {

          scale:2,

          backgroundColor:"#ffffff",

          useCORS:true,

          logging:false,


          onclone:(clonedDoc)=>{


            replaceOKLCH(
              clonedDoc
            );


          }

        }

      );



    return canvas;


  }







  async function exportPNG(){


    try{


      setLoading("png");


      const canvas =
        await captureChart();



      const link =
        document.createElement("a");



      link.download =
        "chart.png";


      link.href =
        canvas.toDataURL(
          "image/png"
        );


      link.click();


    }


    catch(error){

      console.error(
        "PNG ERROR:",
        error
      );


      alert(
        "PNG export failed"
      );

    }


    finally{

      setLoading("");

    }


  }








  async function exportPDF(){


    try{


      setLoading("pdf");


      const canvas =
        await captureChart();



      const img =
        canvas.toDataURL(
          "image/jpeg",
          0.95
        );



      const pdf =
        new jsPDF(
          "landscape",
          "mm",
          "a4"
        );



      const width =
        pdf.internal.pageSize.getWidth();



      const height =
        pdf.internal.pageSize.getHeight();



      pdf.addImage(
        img,
        "JPEG",
        10,
        10,
        width-20,
        height-20
      );



      pdf.save(
        "chart-report.pdf"
      );


    }


    catch(error){

      console.error(
        "PDF ERROR:",
        error
      );


      alert(
        "PDF export failed"
      );

    }


    finally{

      setLoading("");

    }


  }






  return (

    <div className="
      card
      bg-base-100
      shadow-xl
      p-6
    ">


      <div className="
        flex
        flex-col
        md:flex-row
        justify-between
        items-center
        gap-4
      ">


        <div>


          <div className="
            badge
            badge-primary
            mb-2
          ">
            Export
          </div>


          <h2 className="
            text-xl
            font-bold
          ">
            Download Chart
          </h2>


          <p className="
            text-sm
            opacity-60
          ">
            Export visualization as PNG or PDF.
          </p>


        </div>




        <div className="
          flex
          gap-3
        ">


          <button

            className="
              btn
              btn-primary
              gap-2
            "

            onClick={exportPNG}

            disabled={loading}

          >


            {
              loading==="png"

              ?

              <Loader2
                className="animate-spin"
              />

              :

              <FileImage/>

            }


            PNG


          </button>






          <button

            className="
              btn
              btn-secondary
              gap-2
            "

            onClick={exportPDF}

            disabled={loading}

          >


            {
              loading==="pdf"

              ?

              <Loader2
                className="animate-spin"
              />

              :

              <FileText/>

            }


            PDF


          </button>



        </div>


      </div>


    </div>

  );

}