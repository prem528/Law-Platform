// src/api/axios.js
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token && config.headers) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default API;


//uploadDocument.ts
export const uploadCaseDocument = async ({
  caseId,
  file,
}: {
  caseId: string;
  file: File;
}) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await axios.post(
    `http://localhost:5000/api/cases/${caseId}/documents`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );

  return response.data;
};
