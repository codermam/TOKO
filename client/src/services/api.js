import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const uploadFile = (file) => {
  const formData = new FormData();
  formData.append("file", file);
  return api.post("/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const saveManualData = (payload) => api.post("/upload/manual", payload);

export const getAllDatasets = () => api.get("/upload");

export const getDatasetById = (id) => api.get(`/upload/${id}`);

export const getChartData = (id, xKey, yKey) =>
  api.get(`/chart/${id}`, { params: { xKey, yKey } });

export default api;