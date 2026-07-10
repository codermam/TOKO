import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useReactToPrint } from "react-to-print";

export default function ExportButtons({ chartRef }) {
  const captureCanvas = async () => {
    if (!chartRef.current) return null;
    return html2canvas(chartRef.current, { backgroundColor: "#ffffff", scale: 2 });
  };

  const downloadImage = async (format) => {
    const canvas = await captureCanvas();
    if (!canvas) return;
    const mime = format === "jpg" ? "image/jpeg" : "image/png";
    const link = document.createElement("a");
    link.download = `toko-chart.${format}`;
    link.href = canvas.toDataURL(mime, 1.0);
    link.click();
  };

  const downloadPDF = async () => {
    const canvas = await captureCanvas();
    if (!canvas) return;
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({
      orientation: "landscape",
      unit: "px",
      format: [canvas.width, canvas.height],
    });
    pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
    pdf.save("toko-chart.pdf");
  };

  const handlePrint = useReactToPrint({
    contentRef: chartRef,
    documentTitle: "toko-chart",
  });

  return (
    <div className="card bg-base-100 corner-marks p-6 shadow-sm w-full">
      <p className="font-mono-data text-xs tracking-widest text-pine uppercase mb-4">
        03 — Export
      </p>
      <div className="flex flex-row flex-wrap gap-3">
        <button onClick={() => downloadImage("png")} className="btn btn-sm btn-primary font-mono-data">
          Download PNG
        </button>
        <button onClick={() => downloadImage("jpg")} className="btn btn-sm btn-primary font-mono-data">
          Download JPG
        </button>
        <button onClick={downloadPDF} className="btn btn-sm btn-secondary font-mono-data">
          Download PDF
        </button>
        <button onClick={handlePrint} className="btn btn-sm btn-outline font-mono-data">
          Print
        </button>
      </div>
    </div>
  );
}