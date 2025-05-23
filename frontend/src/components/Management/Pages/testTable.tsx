import React from "react";
import type { Case } from "@/lib/types";
import { cases } from "@/lib/data";
import { Badge } from "@/components/ui/badge";

interface CaseTableProps {
  cases: Case[];
  formatDate: (date: string) => string;
  getStatusBadge: (status: string) => JSX.Element;
  getPriorityBadge: (priority: string) => JSX.Element;
}

const CaseTable: React.FC<CaseTableProps> = ({
  cases,
  formatDate,
  getStatusBadge,
  getPriorityBadge,
}) => {
  return (
    <div className="w-full mt-6 rounded-md border bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[800px] text-sm text-left text-gray-700">
          <thead className="bg-gray-100 text-xs uppercase text-gray-600">
            <tr>
              <th className="px-4 py-3 whitespace-nowrap">Title</th>
              <th className="px-4 py-3 whitespace-nowrap">Client</th>
              <th className="px-4 py-3 whitespace-nowrap">Type</th>
              <th className="px-4 py-3 whitespace-nowrap">Status</th>
              <th className="px-4 py-3 whitespace-nowrap">Priority</th>
              <th className="px-4 py-3 whitespace-nowrap">Created</th>
              <th className="px-4 py-3 whitespace-nowrap">Due Date</th>
            </tr>
          </thead>
          <tbody>
            {cases.map((caseItem) => (
              <tr key={caseItem.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3 font-medium whitespace-nowrap">{caseItem.title}</td>
                <td className="px-4 py-3 whitespace-nowrap">{caseItem.clientName}</td>
                <td className="px-4 py-3 whitespace-nowrap">{caseItem.type}</td>
                <td className="px-4 py-3 whitespace-nowrap">{getStatusBadge(caseItem.status)}</td>
                <td className="px-4 py-3 whitespace-nowrap">{getPriorityBadge(caseItem.priority)}</td>
                <td className="px-4 py-3 whitespace-nowrap">{formatDate(caseItem.dateCreated)}</td>
                <td className="px-4 py-3 whitespace-nowrap">{caseItem.dueDate ? formatDate(caseItem.dueDate) : "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const CaseTableWrapper = () => {
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'unassigned':
        return <Badge className="bg-gray-100 text-gray-800">Unassigned</Badge>;
      case 'assigned':
        return <Badge className="bg-blue-100 text-blue-800">Assigned</Badge>;
      case 'in-progress':
        return <Badge className="bg-purple-100 text-purple-800">In Progress</Badge>;
      case 'closed':
        return <Badge className="bg-green-100 text-green-800">Completed</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">Unknown</Badge>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
        return <Badge className="bg-red-100 text-red-800">High</Badge>;
      case 'medium':
        return <Badge className="bg-amber-100 text-amber-800">Medium</Badge>;
      case 'low':
        return <Badge className="bg-green-100 text-green-800">Low</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">Unknown</Badge>;
    }
  };

  return (
    <CaseTable
      cases={cases}
      formatDate={formatDate}
      getStatusBadge={getStatusBadge}
      getPriorityBadge={getPriorityBadge}
    />
  );
};

export default CaseTableWrapper;
