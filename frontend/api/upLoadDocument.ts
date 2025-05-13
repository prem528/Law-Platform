// uploadDocument.ts
import API from "../api/axios"; // adjust path as needed

export const uploadCaseDocument = async ({
  caseId,
  file,
}: {
  caseId: string;
  file: File;
}) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await API.post(`/cases/${caseId}/documents`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};
