import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Case } from "@/lib/types";

interface CaseCardProps {
  caseItem: Case;
  showAssignButton?: boolean;
  onSelectCase?: (caseId: string) => void;
  isSelected?: boolean;
}

const CaseCard = ({
  caseItem,
  onSelectCase,
  isSelected = false,
}: CaseCardProps) => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 hover:bg-red-200";
      case "medium":
        return "bg-amber-100 text-amber-800 hover:bg-amber-200";
      case "low":
        return "bg-green-100 text-green-800 hover:bg-green-200";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-200";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "unassigned":
        return "bg-red-100 text-red-600";
      case "assigned":
        return "bg-blue-100 text-blue-800";
      case "in-progress":
        return "bg-purple-100 text-purple-800";
      case "closed":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  return (
    <Card
      className={`w-full h-full cursor-pointer transition-all hover:scale-[1.01] ${
        isSelected ? "ring-2 ring-blue-400 shadow-lg" : "hover:shadow-md"
      }`}
      onClick={() => onSelectCase && onSelectCase(caseItem.id)}
    >
      <CardHeader className="p-4">
        <div className="flex justify-between items-start gap-2 min-w-0">
          <CardTitle className="text-lg font-medium line-clamp-2 truncate">
            {caseItem.title}
          </CardTitle>
          <Badge className={`flex-shrink-0 ${getPriorityColor(caseItem.priority)}`}>
            {caseItem.priority}
          </Badge>
        </div>

        <div className="flex items-center mt-2 text-sm text-gray-500 gap-2 flex-wrap">
          <span className="truncate">{caseItem.clientName}</span>
          <Badge variant="outline" className="flex-shrink-0">
            {caseItem.type}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="p-4 pt-0">
        <p className="text-sm text-gray-600 line-clamp-2 mb-3">{caseItem.description}</p>

        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary" className={`flex-shrink-0 ${getStatusColor(caseItem.status)}`}>
            {caseItem.status === "unassigned" ? "Not Assigned" : caseItem.status.replace("-", " ")}
          </Badge>

          <Badge variant="outline" className="flex-shrink-0">
            Created: {formatDate(caseItem.dateCreated)}
          </Badge>

          {caseItem.dueDate && (
            <Badge variant="outline" className="flex-shrink-0 border-amber-300">
              Due: {formatDate(caseItem.dueDate)}
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default CaseCard;
