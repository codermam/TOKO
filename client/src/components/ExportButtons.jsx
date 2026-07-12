import { useState } from "react";
import { toPng, toJpeg } from "html-to-image";
import jsPDF from "jspdf";
import { useReactToPrint } from "react-to-print";

export default function ExportButtons({ chartRef }) {
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const captureOptions = {
    backgroundColor: "#ffffff",
    pixelRatio: 2,
    cacheBust: true,
    skipFonts: true, // avoids CORS failures embedding Google Fonts
  };

  const downloadImage = async (format) => {
    if (!chartRef.current) return;
    setError("");
    setBusy(true);
    try {
      const dataUrl =
        format === "jpg"
          ? await toJpeg(chartRef.current, captureOptions)
          : await toPng(chartRef.current, captureOptions);

      const link = document.createElement("a");
      link.download = `toko-chart.${format}`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Export failed:", err);
      setError(`Couldn't create the ${format.toUpperCase()}. Try again, or use Print instead.`);
    } finally {
      setBusy(false);
    }
  };

  const downloadPDF = async () => {
    if (!chartRef.current) return;
    setError("");
    setBusy(true);
    try {
      const dataUrl = await toPng(chartRef.current, captureOptions);

      const img = new Image();
      img.src = dataUrl;
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
      });

      const pdf = new jsPDF({
        orientation: img.width >= img.height ? "landscape" : "portrait",
        unit: "px",
        format: [img.width, img.height],
      });
      pdf.addImage(dataUrl, "PNG", 0, 0, img.width, img.height);
      pdf.save("toko-chart.pdf");
    } catch (err) {
      console.error("PDF export failed:", err);
      setError("Couldn't create the PDF. Try again, or use Print instead.");
    } finally {
      setBusy(false);
    }
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
        <button
          onClick={() => downloadImage("png")}
          disabled={busy}
          className="btn btn-sm btn-primary font-mono-data"
        >
          {busy ? "Working…" : "Download PNG"}
        </button>
        <button
          onClick={() => downloadImage("jpg")}
          disabled={busy}
          className="btn btn-sm btn-primary font-mono-data"
        >
          {busy ? "Working…" : "Download JPG"}
        </button>
        <button
          onClick={downloadPDF}
          disabled={busy}
          className="btn btn-sm btn-secondary font-mono-data"
        >
          {busy ? "Working…" : "Download PDF"}
        </button>
        <button onClick={handlePrint} className="btn btn-sm btn-outline font-mono-data">
          Print
        </button>
      </div>
      {error && <p className="text-brick text-sm mt-3">{error}</p>}
    </div>
  );
}