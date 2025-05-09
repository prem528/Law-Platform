
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight, FileText, Upload } from "lucide-react";
import API from "../../../../api/axios";

interface Lawyer {
  name: string;
  email: string;
}

interface Document {
  id: string;
  filename: string;
  fileUrl: string;
}

interface Case {
  id: string;
  title: string;
  status: string;
  description: string;
  lawyer?: Lawyer;
  documents?: Document[];
}

const Dashboard = () => {
  const [cases, setCases] = useState<Case[]>([]);
  const [selectedCase, setSelectedCase] = useState<Case | null>(null);

  useEffect(() => {
    API.get<Case[]>("/cases/mine")
      .then((res) => setCases(res.data))
      .catch((err) => console.error("Failed to fetch cases", err));
  }, []);

  const handleViewDetails = (caseId: string) => {
    API.get<Case>(`/cases/${caseId}`)
      .then((res) => setSelectedCase(res.data))
      .catch((err) => console.error("Failed to fetch case details", err));
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-semibold text-gray-800 mb-8">My Case Dashboard</h2>

      {!selectedCase ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {cases.map((caseItem) => (
            <Card key={caseItem.id} className="shadow-md hover:shadow-lg transition">
              <CardHeader className="bg-gray-50 border-b">
                <CardTitle className="text-xl mt-10">{caseItem.title}</CardTitle>
                <p className="text-sm text-gray-500 mt-1">Status: {caseItem.status}</p>
              </CardHeader>

              <CardContent className="py-5 space-y-4">
                <div>
                  <p className="text-sm text-gray-600 mb-1 font-medium">Tracking ID</p>
                  <p className="font-mono text-blue-600">{caseItem.id}</p>
                </div>

                <div className="flex items-center gap-3">
                  <Upload className="text-indigo-600" />
                  <p className="text-sm">Upload files or view submitted documents</p>
                </div>

                <div className="flex items-center gap-3">
                  <FileText className="text-green-600" />
                  <p className="text-sm">Description: {caseItem.description}</p>
                </div>

                {caseItem.lawyer ? (
                  <div className="mt-4 bg-green-50 p-3 rounded-md">
                    <p className="text-xs text-gray-500 mb-1">Assigned Lawyer</p>
                    <p className="font-medium">{caseItem.lawyer.name}</p>
                    <p className="text-sm text-gray-600">{caseItem.lawyer.email}</p>
                  </div>
                ) : (
                  <p className="text-sm text-yellow-600 italic mt-2">No lawyer assigned yet</p>
                )}

                <div className="mt-4 text-right">
                  <Button variant="secondary" size="sm" className="text-blue-600" onClick={() => handleViewDetails(caseItem.id)}>
                    View Details <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="bg-white p-6 rounded-md shadow-md">
          <h3 className="text-2xl font-semibold mb-4">Case Details</h3>
          <p><strong>Title:</strong> {selectedCase.title}</p>
          <p><strong>Status:</strong> {selectedCase.status}</p>
          <p><strong>Description:</strong> {selectedCase.description}</p>
          {selectedCase.lawyer && (
            <div className="mt-4">
              <p className="text-sm text-gray-500">Assigned Lawyer</p>
              <p className="font-medium">{selectedCase.lawyer.name}</p>
              <p className="text-sm">{selectedCase.lawyer.email}</p>
            </div>
          )}

          <div className="mt-6">
            <h4 className="text-lg font-semibold mb-2">Documents</h4>
            {selectedCase.documents && selectedCase.documents.length > 0 ? (
              <ul className="list-disc pl-6">
                {selectedCase.documents.map((doc) => (
                  <li key={doc.id}>
                    <a href={`http://localhost:5000/${doc.fileUrl}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                      {doc.filename}
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-500">No documents uploaded yet.</p>
            )}
          </div>

          <div className="mt-6 text-right">
            <Button onClick={() => setSelectedCase(null)} variant="outline">Back to Dashboard</Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
