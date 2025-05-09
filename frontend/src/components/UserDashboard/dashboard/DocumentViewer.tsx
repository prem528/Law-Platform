import { useState } from "react";
import { FileText, ChevronRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import DocumentUpload from "./DocumentUpload";

interface Document {
  id: string;
  filename: string;
  fileUrl: string;
}

interface DocumentViewerProps {
  caseId: string;
  documents?: Document[];
  onRefresh?: () => void;
}

const DocumentViewer = ({ caseId, documents = [], onRefresh }: DocumentViewerProps) => {
  const [showUpload, setShowUpload] = useState(false);

  const handleUploadComplete = () => {
    setShowUpload(false);
    if (onRefresh) {
      onRefresh();
    }
  };

  return (
    <Card className="">
      <div className="h-1 bg-legal-accent w-full"></div>
      <CardHeader className="border-b flex flex-row items-center justify-between">
        <CardTitle className="text-lg">Case Documents</CardTitle>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => setShowUpload(!showUpload)}
          className="text-legal-secondary border-legal-secondary/20 hover:border-legal-secondary/50"
        >
          {showUpload ? "Cancel" : "Upload New Document"}
        </Button>
      </CardHeader>
      <CardContent className="py-5">
        {showUpload && (
          <div className="mb-6 p-4 bg-gray-50 rounded-md border border-gray-100">
            <h3 className="text-sm font-medium mb-3">Upload Documents</h3>
            <DocumentUpload caseId={caseId} onUploadComplete={handleUploadComplete} />
          </div>
        )}

        {documents.length > 0 ? (
          <div className="space-y-2">
            {documents.map((doc) => (
              <a
                key={doc.id}
                href={`http://localhost:5000/${doc.fileUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center p-3 rounded-md hover:bg-gray-50 border border-gray-100 transition-colors group"
              >
                <div className="p-2 bg-blue-50 rounded-md group-hover:bg-blue-100 transition-colors">
                  <FileText className="h-5 w-5 text-legal-secondary" />
                </div>
                <div className="ml-3 flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{doc.filename}</p>
                  <p className="text-xs text-gray-500">Click to view</p>
                </div>
                <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
              </a>
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center py-6 border border-dashed border-gray-300 rounded-md bg-gray-50">
            <div className="text-center">
              <FileText className="h-8 w-8 mx-auto text-gray-400" />
              <p className="mt-2 text-sm text-gray-500">No documents uploaded yet</p>
              {!showUpload && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="mt-3"
                  onClick={() => setShowUpload(true)}
                >
                  Upload your first document
                </Button>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DocumentViewer;
