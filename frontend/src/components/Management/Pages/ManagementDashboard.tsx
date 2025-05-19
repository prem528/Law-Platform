import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import UnassignedCaseList from "../components/UnassignedCaseList";
import LawyerProfileCard from "../components/LawyerProfileCard";
import LawyerSelectDropdown from "../components/LawyerSelectDropdown";
import AssignCaseButton from "../components/AssignCaseButton";
import type { Case } from "@/lib/types";
import { cases, lawyers } from "@/lib/data";
 
 

const ManagementDashboard = () => {
  const [selectedCaseId, setSelectedCaseId] = useState<string | null>(null);
  const [selectedLawyerId, setSelectedLawyerId] = useState<string | null>(null);
  const [localCases, setLocalCases] = useState<Case[]>(cases);
  const [assigningCase, setAssigningCase] = useState(false);

  const handleCaseSelect = (caseId: string) => {
    setSelectedCaseId(caseId);
  };

  const handleLawyerSelect = (lawyerId: string) => {
    setSelectedLawyerId(lawyerId);
  };

  const handleAssignCase = () => {
    if (!selectedCaseId || !selectedLawyerId) return;

    setAssigningCase(true);
    
    // Simulate API call
    setTimeout(() => {
      // Update the case status and assigned lawyer
      const updatedCases = localCases.map(c => {
        if (c.id === selectedCaseId) {
          return {
            ...c,
            status: 'assigned' as const,
            assignedTo: selectedLawyerId
          };
        }
        return c;
      });

      setLocalCases(updatedCases);
      setSelectedCaseId(null);
      setSelectedLawyerId(null);
      setAssigningCase(false);
    }, 800);
  };

  const unassignedCases = localCases.filter(c => c.status === 'unassigned');
  const selectedCase = localCases.find(c => c.id === selectedCaseId);

  const getCardCount = (status: string) => {
    return localCases.filter(c => c.status === status).length;
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <main className="flex-1 container py-6">
        {/* <h1 className="text-2xl font-bold mb-6">Management Dashboard</h1> */}

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 ">
          <Card className="py-2">
            <CardHeader className="flex items justify-center ">
              <CardTitle className="text-xl font-normal text-gray-600">Total Cases</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold flex items justify-center">{localCases.length}</div>
            </CardContent>
          </Card>

          <Card className="py-2">
            <CardHeader className="flex items justify-center">
              <CardTitle className="text-xl font-medium text-gray-600">Unassigned Cases</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold flex items justify-center">{getCardCount('unassigned')}</div>
            </CardContent>
          </Card>

          <Card className="py-2">
            <CardHeader className="flex items justify-center">
              <CardTitle className="text-xl font-medium text-gray-600">Active Lawyers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold flex items justify-center">{lawyers.length}</div>
            </CardContent>
          </Card>

          <Card className="py-2">
            <CardHeader className="flex items justify-center">
              <CardTitle className="text-xl font-medium text-gray-600">In Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold flex items justify-center">{getCardCount('in-progress')}</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 px-12 py-12">
          <div className="lg:col-span-2">
            <Tabs defaultValue="unassigned" >
              <TabsList className="bg-blue-200 w-sm h-14 ">
                <TabsTrigger value="unassigned">Unassigned Cases</TabsTrigger>
                <TabsTrigger value="lawyers">Lawyers</TabsTrigger>
              </TabsList>
              <TabsContent value="unassigned" className="pt-4">
                <UnassignedCaseList
                  cases={localCases}
                  onCaseSelect={handleCaseSelect}
                  selectedCaseId={selectedCaseId}
                />
              </TabsContent>
              <TabsContent value="lawyers" className="pt-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {lawyers.map(lawyer => (
                    <LawyerProfileCard 
                      key={lawyer.id}
                      lawyer={lawyer}
                    />
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          <div>
            <Card className="py-2 ">
              <CardHeader>
                <CardTitle className="flex items justify-center text-xl font-light text-green-500">Assign Case</CardTitle>
              </CardHeader>
              <CardContent>
                {!selectedCaseId ? (
                  <div className="text-center py-6 text-gray-500">
                    Select a case to assign to a lawyer
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Selected Case:</p>
                      <p className="font-medium">{selectedCase?.title}</p>
                    </div>

                    <div className="space-y-2">
                      <p className="text-sm text-gray-500">Assign to:</p>
                      <LawyerSelectDropdown
                        lawyers={lawyers}
                        selectedLawyerId={selectedLawyerId}
                        onSelect={handleLawyerSelect}
                      />
                    </div>

                    <div className="mt-6">
                      <AssignCaseButton
                        onAssign={handleAssignCase}
                        disabled={!selectedCaseId || !selectedLawyerId}
                        isAssigning={assigningCase}
                      />
                    </div>  
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ManagementDashboard;