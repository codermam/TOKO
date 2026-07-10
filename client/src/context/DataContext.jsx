import { createContext, useContext, useState } from "react";

const DataContext = createContext(null);

export function DataProvider({ children }) {
  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);
  const [datasetName, setDatasetName] = useState("");

  const setDataset = (newColumns, newRows, name = "Untitled Dataset") => {
    setColumns(newColumns);
    setRows(newRows);
    setDatasetName(name);
  };

  const clearDataset = () => {
    setColumns([]);
    setRows([]);
    setDatasetName("");
  };

  return (
    <DataContext.Provider
      value={{ columns, rows, datasetName, setDataset, clearDataset }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error("useData must be used within DataProvider");
  return ctx;
}