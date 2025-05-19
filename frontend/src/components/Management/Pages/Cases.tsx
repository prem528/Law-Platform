import { useState } from "react";

 
import { cases } from "@/lib/data";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type{ Case } from "@/lib/types";
import CaseCard from "../components/CaseCard";

const Cases = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState<"cards" | "table">("cards");
  const itemsPerPage = 6;

  const filterCases = (status: string) => {
    if (status === "all") return cases;
    return cases.filter(c => c.status === status);
  };

  const searchFilteredCases = (casesToFilter: Case[]) => {
    if (!searchTerm) return casesToFilter;
    
    return casesToFilter.filter(c => 
      c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.type.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const statusTabs = [
    { id: "all", label: "All Cases", count: cases.length },
    { id: "unassigned", label: "Unassigned", count: cases.filter(c => c.status === 'unassigned').length },
    { id: "assigned", label: "Assigned", count: cases.filter(c => c.status === 'assigned').length },
    { id: "in-progress", label: "In Progress", count: cases.filter(c => c.status === 'in-progress').length },
    { id: "closed", label: "Completed", count: cases.filter(c => c.status === 'closed').length }
  ];

  const paginateResults = (items: Case[]) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return items.slice(startIndex, startIndex + itemsPerPage);
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
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

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 px-12">
     
      <main className="flex-1 container py-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <h1 className="text-2xl font-bold">Case Management</h1>
          
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <div className="relative max-w-xs">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Search cases..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex gap-2">
              <button 
                onClick={() => setViewMode("cards")} 
                className={`px-3 cursor-pointer py-1 rounded ${viewMode === "cards" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
              >
                Cards
              </button>
              <button 
                onClick={() => setViewMode("table")} 
                className={`px-3 cursor-pointer py-1 rounded ${viewMode === "table" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
              >
                Table
              </button>
            </div>
          </div>
        </div>

        <Tabs defaultValue="all">
          <TabsList className="mb-6 w-full flex overflow-x-auto bg-blue-200 h-10">
            {statusTabs.map(tab => (
              <TabsTrigger key={tab.id} value={tab.id} className="flex-shrink-0">
                {tab.label} ({tab.count})
              </TabsTrigger>
            ))}
          </TabsList>

          {statusTabs.map(tab => (
            <TabsContent key={tab.id} value={tab.id} className="animate-fade-in">
              {viewMode === "cards" ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {paginateResults(searchFilteredCases(filterCases(tab.id))).map(caseItem => (
                    <CaseCard key={caseItem.id} caseItem={caseItem} />
                  ))}
                </div>
              ) : (
                <div className="rounded-md border overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Client</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Priority</TableHead>
                        <TableHead>Created</TableHead>
                        <TableHead>Due Date</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {paginateResults(searchFilteredCases(filterCases(tab.id))).map(caseItem => (
                        <TableRow key={caseItem.id}>
                          <TableCell className="font-medium">{caseItem.title}</TableCell>
                          <TableCell>{caseItem.clientName}</TableCell>
                          <TableCell>{caseItem.type}</TableCell>
                          <TableCell>{getStatusBadge(caseItem.status)}</TableCell>
                          <TableCell>{getPriorityBadge(caseItem.priority)}</TableCell>
                          <TableCell>{formatDate(caseItem.dateCreated)}</TableCell>
                          <TableCell>{caseItem.dueDate ? formatDate(caseItem.dueDate) : "-"}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}

              {searchFilteredCases(filterCases(tab.id)).length === 0 && (
                <div className="flex flex-col items-center justify-center p-8 text-center bg-gray-50 rounded-lg border border-dashed">
                  <p className="text-gray-500 mb-2">No cases found</p>
                  <p className="text-sm text-gray-400">{searchTerm ? "Try different search terms" : "No cases in this category"}</p>
                </div>
              )}

              {searchFilteredCases(filterCases(tab.id)).length > itemsPerPage && (
                <Pagination className="mt-4">
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious 
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} 
                        className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                      />
                    </PaginationItem>
                    {[...Array(Math.ceil(searchFilteredCases(filterCases(tab.id)).length / itemsPerPage))].map((_, i) => (
                      <PaginationItem key={i}>
                        <PaginationLink 
                          isActive={currentPage === i + 1} 
                          onClick={() => setCurrentPage(i + 1)}
                        >
                          {i + 1}
                        </PaginationLink>
                      </PaginationItem>
                    ))}
                    <PaginationItem>
                      <PaginationNext 
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, Math.ceil(searchFilteredCases(filterCases(tab.id)).length / itemsPerPage)))} 
                        className={currentPage === Math.ceil(searchFilteredCases(filterCases(tab.id)).length / itemsPerPage) ? "pointer-events-none opacity-50" : ""}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </main>
    </div>
  );
};

export default Cases;
