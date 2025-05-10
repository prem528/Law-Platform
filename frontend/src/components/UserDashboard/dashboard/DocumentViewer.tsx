import { useState } from "react";
import { FileText, ChevronRight, FolderPlus } from "lucide-react";
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
    <Card className="border-0 shadow-md overflow-hidden">
      <div className="h-6 bg-blue-200 w-full"></div>
      <CardHeader className="border-b flex flex-row items-center justify-between py-4">
        <CardTitle className="text-xl font-medium">Case Documents</CardTitle>
        <Button 
          variant="outline" 
          size="lg"
          onClick={() => setShowUpload(!showUpload)}
          className="text-blue-400 border-blue-300 hover:border-blue-400 hover:bg-blue-100 "
        >
          {showUpload ? "Cancel" : 
            <div className="flex items-center gap-1.5">
              <FolderPlus className="h-3.5 w-3.5" />
              <span>Upload Documents</span>
            </div>
          }
        </Button>
      </CardHeader>
      <CardContent className="p-4">
        {showUpload && (
          <div className="mb-4 p-3 bg-gray-50 rounded-md border border-gray-100">
            <h3 className="text-sm font-medium mb-2">Upload Documents</h3>
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
              {!showUpload && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="mt-2 text-xs"
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