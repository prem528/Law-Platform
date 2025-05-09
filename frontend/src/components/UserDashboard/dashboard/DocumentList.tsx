import { FileText } from "lucide-react";

interface Document {
  id: string;
  filename: string;
  fileUrl: string;
}

interface DocumentListProps {
  documents?: Document[];
}

const DocumentList = ({ documents }: DocumentListProps) => {
  if (!documents || documents.length === 0) {
    return (
      <div className="flex items-center justify-center py-6 border border-dashed border-gray-300 rounded-md bg-gray-50">
        <div className="text-center">
          <FileText className="h-8 w-8 mx-auto text-blue-400" />
          <p className="mt-2 text-sm text-gray-500">No documents uploaded yet</p>
        </div>
      </div>
    );
  }

  return (
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
            <FileText className="h-8 w-8 text-blue-400" />
          </div>
          <div className="ml-3 flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">{doc.filename}</p>
            <p className="text-xs text-gray-500">Click to view</p>
          </div>
        </a>
      ))}
    </div>
  );
};

export default DocumentList;
