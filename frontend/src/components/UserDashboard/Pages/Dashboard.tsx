import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight, FileText, Upload } from "lucide-react";
import StatusBadge from "../dashboard/StatusBadge";
import LawyerInfo from "../dashboard/LawyerInfo";
import DocumentList from "../dashboard/DocumentList";
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
  createdAt: string;
}

const Dashboard = () => {
  const [cases, setCases] = useState<Case[]>([]);
  const [selectedCase, setSelectedCase] = useState<Case | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    API.get<Case[]>("/cases/mine")
      .then((res) => {
        setCases(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch cases", err);
        setLoading(false);
      });
  }, []);

  const handleViewDetails = (caseId: string) => {
    setLoading(true);
    API.get<Case>(`/cases/${caseId}`)
      .then((res) => {
        setSelectedCase(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch case details", err);
        setLoading(false);
      });
  };

  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  };
  

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-6xl mx-auto px-4 py-1">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-bold text-legal-primary">
              Legal Case Portal
            </h1>
            <p className="text-gray-600 mt-2 max-w-xl">
              View and manage your ongoing legal cases. Upload documents, track progress, and communicate with your legal team.
            </p>
          </div>
          <Button className="bg-black hover:bg-legal-primary/90">
            + New Case
          </Button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-pulse-soft">
              <div className="h-8 w-32 bg-gray-200 rounded mb-4"></div>
              <div className="h-64 bg-gray-100 rounded-lg w-full max-w-3xl"></div>
            </div>
          </div>
        ) : !selectedCase ? (
          <>
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">My Active Cases</h2>
              <div className="h-1 w-20 bg-legal-secondary rounded"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 animate-fade-in">
              {cases.map((caseItem) => (
                <Card key={caseItem.id} className="border-0 overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
                  <div className="h-4 bg-blue-200 w-full"></div>
                  <CardHeader className="border-b bg-white">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg text-legal-primary">{caseItem.title}</CardTitle>
                      <StatusBadge status={caseItem.status} />
                    </div>
                  </CardHeader>

                  <CardContent className="mb-6 space-y-4 bg-white">
                    <div>
                      <p className="text-normal py-2 uppercase tracking-wider text-black font-medium">Case Reference ID</p>
                      <p className="font-mono text-sm text-blue-500">{caseItem.id}</p>
                    </div>

                    <div className="bg-gray-50 p-3 rounded-md">
                      <p className="text-sm text-gray-700">{caseItem.description}</p>
                    </div>

                    {/* <div className="flex flex-wrap items-center gap-2">
                      <div className="flex items-center gap-1.5 px-2 py-1 bg-blue-50 rounded-md">
                        <Upload className="h-4 w-4 text-legal-secondary" />
                        <span className="text-xs text-legal-secondary font-medium">Documents</span>
                      </div>
                      <div className="flex items-center gap-1.5 px-2 py-1 bg-green-50 rounded-md">
                        <FileText className="h-4 w-4 text-green-600" />
                        <span className="text-xs text-green-700 font-medium">Notes</span>
                      </div>
                    </div> */}

                    <div className="mt-2">
                      <LawyerInfo lawyer={caseItem.lawyer} />
                    </div>

                    <div className="mt-4 text-right">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="text-legal-secondary hover:text-legal-primary border-legal-secondary/20 hover:border-legal-secondary/50" 
                        onClick={() => handleViewDetails(caseItem.id)}
                      >
                        View Details <ChevronRight className="ml-1 h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        ) : (
          <div className="animate-fade-in">
            <div className="flex items-center mb-6">
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-legal-secondary" 
                onClick={() => setSelectedCase(null)}
              >
                <ChevronRight className="h-4 w-4 rotate-180 mr-1" /> Back
              </Button>
              <div className="h-6 border-l border-gray-300 mx-4"></div>
              <h2 className="text-xl font-semibold text-gray-800">{selectedCase.title}</h2>
              <div className="flex-grow"></div>
              <StatusBadge status={selectedCase.status} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <Card className="border-0 shadow-md overflow-hidden">
                  <div className="h-6 bg-blue-200 w-full"></div>
                  <CardHeader className="border-b">
                    <CardTitle className="text-lg">Case Details</CardTitle>
                  </CardHeader>
                  <CardContent className="py-5">
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-normal uppercase tracking-wider text-black font-medium">Case Reference ID</p>
                          <p className="font-mono text-blue-400">{selectedCase.id}</p>
                        </div>
                        <div>
                          <p className="text-normal uppercase tracking-wider text-black font-medium">Filed On</p>
                          <p className="text-gray-500">{formatDate(selectedCase.createdAt)}</p>
                        </div>
                      </div>

                      <div>
                        <p className="text-normal uppercase tracking-wider text-black font-medium mb-1">Description</p>
                        <div className="bg-gray-50 p-4 rounded-md">
                          <p className="text-gray-500">{selectedCase.description}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-md overflow-hidden">
                  <div className="h-6 bg-slate-300 w-full"></div>
                  <CardHeader className="border-b">
                    <CardTitle className="text-lg">Case Documents</CardTitle>
                  </CardHeader>
                  <CardContent className="py-5">
                    <DocumentList documents={selectedCase.documents} />
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card className="border-0 shadow-md overflow-hidden">
                  <div className="h-4 bg-yellow-200 w-full"></div>
                  <CardHeader className="border-b">
                    <CardTitle className="text-lg">Legal Representation</CardTitle>
                  </CardHeader>
                  <CardContent className="py-5">
                    <LawyerInfo lawyer={selectedCase.lawyer} />
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-md overflow-hidden">
                  <div className="h-4 bg-green-200 w-full"></div>
                  <CardHeader className="border-b">
                    <CardTitle className="text-lg">Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="py-5 space-y-3">
                    <Button className="w-full justify-start" variant="outline">
                      <Upload className="h-4 w-4 mr-2" /> Upload New Document
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <FileText className="h-4 w-4 mr-2" /> Request Meeting
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
