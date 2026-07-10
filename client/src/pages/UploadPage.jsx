import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FileUploader from "../components/FileUploader";
import ManualDataForm from "../components/ManualDataForm";

export default function UploadPage() {
  const [mode, setMode] = useState("file");
  const navigate = useNavigate();

  const goToVisualize = () => navigate("/visualize");

  return (
    <div className="max-w-4xl mx-auto mt-12 px-6">
      <p className="font-mono-data text-xs tracking-widest text-pine uppercase mb-2">
        01 — Add data
      </p>

      <h2 className="font-display text-3xl font-bold mb-6">
        Bring in your numbers
      </h2>

      <div className="tabs tabs-boxed mb-6 w-fit font-mono-data">
        <button
          type="button"
          className={`tab ${mode === "file" ? "tab-active" : ""}`}
          onClick={() => setMode("file")}
        >
          Upload file
        </button>

        <button
          type="button"
          className={`tab ${mode === "manual" ? "tab-active" : ""}`}
          onClick={() => setMode("manual")}
        >
          Type it in
        </button>
      </div>

      {mode === "file" ? (
        <FileUploader onDone={goToVisualize} />
      ) : (
        <ManualDataForm onDone={goToVisualize} />
      )}
    </div>
  );
}