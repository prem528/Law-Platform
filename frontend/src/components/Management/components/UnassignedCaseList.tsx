 
import type{ Case } from "@/lib/types";
import CaseCard from "./CaseCard";

interface UnassignedCaseListProps {
  cases: Case[];
  onCaseSelect: (caseId: string) => void;
  selectedCaseId: string | null;
}

const UnassignedCaseList = ({ 
  cases, 
  onCaseSelect,
  selectedCaseId 
}: UnassignedCaseListProps) => {
  const unassignedCases = cases.filter((c) => c.status === 'unassigned');
  
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-medium text-red-500">Unassigned Cases ({unassignedCases.length})</h2>
      </div>
      
      {unassignedCases.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-8 text-center bg-gray-50 rounded-lg border border-dashed">
          <p className="text-gray-500 mb-2">No unassigned cases available</p>
          <p className="text-sm text-gray-400">All cases have been assigned to lawyers</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {unassignedCases.map((caseItem) => (
            <CaseCard
              key={caseItem.id}
              caseItem={caseItem}
              onSelectCase={onCaseSelect}
              isSelected={selectedCaseId === caseItem.id}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default UnassignedCaseList;
