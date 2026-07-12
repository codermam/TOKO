import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { DataProvider } from "./context/DataContext";
import Dashboard from "./pages/Dashboard";
import UploadPage from "./pages/UploadPage";
import VisualizePage from "./pages/VisualizePage";

function ThemeToggle() {
  const [theme, setTheme] = useState("light");

  const toggle = () => {
    const next = theme === "light" ? "dark" : "light";

    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
  };

  return (
    <button
      onClick={toggle}
      className="btn btn-sm btn-ghost"
      aria-label="Toggle theme"
      title="Toggle theme"
    >
      {theme === "light" ? (
        // Moon icon
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M21 12.6A9 9 0 1111.4 3a7 7 0 009.6 9.6z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ) : (
        // Sun icon
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
        >
          <circle
            cx="12"
            cy="12"
            r="4.5"
            stroke="currentColor"
            strokeWidth="1.8"
          />
          <path
            d="M12 2v2.5M12 19.5V22M4.2 4.2l1.8 1.8M18 18l1.8 1.8M2 12h2.5M19.5 12H22M4.2 19.8L6 18M18 6l1.8-1.8"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      )}
    </button>
  );
}
function Navbar() {
  return (
    <div
      className="navbar bg-paper px-6"
      style={{
        borderBottom: "2px solid var(--ink)",
        backgroundImage:
          "repeating-linear-gradient(90deg, var(--gridline) 0, var(--gridline) 1px, transparent 1px, transparent 12px)",
        backgroundPosition: "bottom",
        backgroundSize: "12px 6px",
        backgroundRepeat: "repeat-x",
      }}
    >
      <div className="flex-1">
        <Link to="/" className="flex items-center gap-2">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path
              d="M2 18 L8 10 L13 14 L22 4"
              stroke="#2F6F5E"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="22" cy="4" r="2" fill="#E0A458" />
          </svg>

          <span className="font-display text-xl font-bold tracking-tight text-ink">
            Toko
          </span>
        </Link>
      </div>

      <div className="flex items-center gap-2">
        <Link to="/upload" className="btn btn-sm btn-ghost font-mono-data">
          Upload
        </Link>

        <Link
          to="/visualize"
          className="btn btn-sm btn-primary font-mono-data"
        >
          Visualize
        </Link>

        <ThemeToggle />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <DataProvider>
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/upload" element={<UploadPage />} />
          <Route path="/visualize" element={<VisualizePage />} />
        </Routes>
      </BrowserRouter>
    </DataProvider>
  );
}