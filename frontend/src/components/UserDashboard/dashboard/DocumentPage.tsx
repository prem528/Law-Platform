import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import DocumentUpload from "./DocumentUpload";
import API from "../../../../api/axios";

interface Document {
  id: string;
  filename: string;
  fileUrl: string;
}

const Documents = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

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
  
  

  // Handle document upload completion
  const handleUploadComplete = async () => {
    toast({
      title: "Upload complete",
      description: "Your document has been uploaded successfully.",
    });
  
    try {
        const res = await API.get<Document[]>("/cases/documents/mine");
      setDocuments(res.data);
    } catch (error) {
      console.log("Failed to refresh documents", error);
    }
  };
  
  return (
    <div className="bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-bold text-legal-primary">Document Management</h1>
            <p className="text-gray-600 mt-2 max-w-xl">
              Upload, manage and organize your case documents in one place.
            </p>
          </div>
          <Link to="/dashboard">
            <Button 
              variant="outline"
              className="text-legal-secondary border-legal-secondary/20 hover:border-legal-secondary/50"
            >
              Back to Dashboard <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <Card className="border-0 shadow-md overflow-hidden h-full">
              <div className="h-4 bg-blue-200 w-full"></div>
              <CardHeader className="border-b">
                <CardTitle className="text-lg">Upload Documents</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <p className="text-sm text-gray-600 mb-4">
                  Upload documents related to your legal cases. We support various file formats including PDF, DOC, DOCX, JPG, PNG.
                </p>
                <DocumentUpload
                  caseId="all"
                  onUploadComplete={handleUploadComplete}
                />
              </CardContent>
            </Card>
          </div>

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
                  <div className="flex justify-center items-center h-64">
                    <div className="animate-pulse-soft">
                      <div className="h-8 w-32 bg-gray-200 rounded mb-4"></div>
                      <div className="h-32 bg-gray-100 rounded-lg w-full"></div>
                    </div>
                  </div>
                ) : documents.length > 0 ? (
                  <div className="space-y-2">
                    {documents.map((doc) => (
                      <a
                        key={doc.id}
                        href={`${doc.fileUrl}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center p-2.5 rounded-md hover:bg-gray-50 border border-gray-100 transition-colors group"
                      >
                        <div className="p-1.5 bg-blue-50 rounded-md group-hover:bg-blue-100 transition-colors">
                          <FileText className="h-4 w-4 text-legal-secondary" />
                        </div>
                        <div className="ml-2 flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">{doc.filename}</p>
                          <p className="text-xs text-gray-500">Click to view</p>
                        </div>
                        <ChevronRight className="h-3.5 w-3.5 text-gray-400 group-hover:text-gray-600 transition-colors" />
                      </a>
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
    </div>
  );
};

export default Documents;
