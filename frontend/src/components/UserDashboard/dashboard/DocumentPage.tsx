import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Loader2 } from "lucide-react";
// import { Link } from "react-router-dom";

import API from "../../../../api/axios";

interface Document {
  id: string;
  filename: string;
  fileUrl: string;
}

const Documents = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    const fetchDocuments = async () => {
      setLoading(true);
      try {
        const res = await API.get<Document[]>("/cases/documents/mine");
        setDocuments(res.data);
      } catch (error) {
        console.log("Failed to fetch documents", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDocuments();
  }, []);



  return (
    <div className="px-24">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-bold text-legal-primary">Document Management</h1>
          <p className="text-gray-600 mt-2 max-w-xl">
            Upload, manage and organize your case documents in one place.
          </p>
        </div>
        {/* <Link to="/dashboard">
            <Button
              variant="outline"
              className="text-legal-secondary border-legal-secondary/20 hover:border-legal-secondary/50"
            >
              Back to Dashboard <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </Link> */}
      </div>

      <div className="">
        <div className="lg:col-span-2">
          <Card className="border-0 shadow-md overflow-hidden">
            <div className="h-4 bg-blue-200 w-full"></div>
            <CardHeader className="border-b flex flex-row items-center justify-between py-4">
              <CardTitle className="text-lg font-medium">My Documents</CardTitle>
              <Button
                variant="outline"
                size="lg"
                className="text-blue-400 border-blue-200 hover:border-blue-400 hover:bg-blue-50 "
              >
                Refresh
              </Button>
            </CardHeader>
            <CardContent className="p-4">
              {loading ? (
                <div className="flex flex-col items-center justify-center h-64 space-y-4">
                  <Loader2 className="h-8 w-8 text-blue-500 animate-spin" />
                  <p className="text-gray-500">Loading your Documents...</p>
                </div>
              ) : documents.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {documents.map((doc) => (
                    <Card key={doc.id} className="shadow-sm border border-gray-100 hover:shadow-md transition duration-300">
                      <a
                        href={doc.fileUrl}
                        
                       
                        className="text-sm text-blue-600 hover:border-blue-200"
                      >
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between mb-2">
                            <FileText className="text-blue-500 w-8 h-8" />
                          </div>
                          <p className="text-sm font-medium text-gray-800 truncate">{doc.filename}</p>
                          <p className="text-xs text-gray-500 mt-1">Uploaded document</p>
                        </CardContent>
                      </a>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="flex items-center justify-center py-5 border border-dashed border-gray-300 rounded-md bg-gray-50">
                  <div className="text-center">
                    <FileText className="h-7 w-7 mx-auto text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500">No documents uploaded</p>
                  </div>
                </div>
              )}
            </CardContent>

          </Card>
        </div>
      </div>
    </div>
  );
};

export default Documents;
