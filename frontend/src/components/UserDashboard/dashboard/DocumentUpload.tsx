import { useState } from "react";
 
import { Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { uploadCaseDocument } from "../../../../api/upLoadDocument";

interface DocumentUploadProps {
  caseId: string;
  onUploadComplete?: () => void;
}

const DocumentUpload = ({ caseId, onUploadComplete }: DocumentUploadProps) => {
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);

    const formData = new FormData();
    formData.append("file", files[0]);

    try {
      await uploadCaseDocument({ caseId, file: files[0] });
    
      toast({
        title: "Document uploaded",
        description: `Successfully uploaded ${files[0].name}`,
      });
    
      if (onUploadComplete) {
        onUploadComplete(); // Refresh parent state
      }
    } catch (error) {
      console.error("Upload failed:", error);
      toast({
        title: "Upload failed",
        description: "There was an error uploading your document",
        variant: "destructive",
      });
    }
    
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <input
          id="file-upload"
          type="file"
          multiple
          className="sr-only"
          onChange={handleFileChange}
          disabled={uploading}
        />
        <label
          htmlFor="file-upload"
          className={`flex items-center gap-2 cursor-pointer  bg-blue-200 hover:bg-legal-primary/90 text-black px-4 py-2 rounded-md transition-colors ${
            uploading ? "opacity-50 pointer-events-none" : ""
          }`}
        >
          <Upload className="h-4 w-4 text-black" />
          {uploading ? "Uploading..." : "Upload Document"}
        </label>
      </div>
      <p className="text-xs text-gray-500">
        Accepted formats: PDF, DOC, DOCX, JPG, PNG (Max 10MB)
      </p>
    </div>
  );
};

export default DocumentUpload;
