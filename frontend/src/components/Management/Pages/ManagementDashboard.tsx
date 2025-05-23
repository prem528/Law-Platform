import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import UnassignedCaseList from "../components/UnassignedCaseList";
import LawyerProfileCard from "../components/LawyerProfileCard";
import LawyerSelectDropdown from "../components/LawyerSelectDropdown";
import AssignCaseButton from "../components/AssignCaseButton";
import type { Case } from "@/lib/types";
import { cases, lawFirms, lawyers } from "@/lib/data";
import LawFirmCard from "../components/LawFirmCard";
import LawFirmDropdown from "../components/LawFirmDropdown";
import LocationDropdown from "../components/SelectLocationDropdown";

interface Location {
  country: string;
  state: string;
  district: string;
}

const ManagementDashboard = () => {
  const [selectedCaseId, setSelectedCaseId] = useState<string | null>(null);
  const [selectedLawyerId, setSelectedLawyerId] = useState<string | null>(null);
  const [localCases, setLocalCases] = useState<Case[]>(cases);
  const [assigningCase, setAssigningCase] = useState(false);
  const [assignTo, setAssignTo] = useState<"lawyer" | "firm">("lawyer");
  const [location, setLocation] = useState<Location>({
    country: "",
    state: "",
    district: ""
  });

  const handleLocationChange = (newLocation: Location) => {
    setLocation(newLocation);
    console.log("Selected Location:", newLocation);
  };

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
      // Update the case status and assigned lawyer/firm
      const updatedCases = localCases.map(c => {
        if (c.id === selectedCaseId) {
          return {
            ...c,
            status: 'assigned' as const,
            assignedTo: selectedLawyerId,
            assignedType: assignTo,
            location: location
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

  // const unassignedCases = localCases.filter(c => c.status === 'unassigned');
  const selectedCase = localCases.find(c => c.id === selectedCaseId);

  const getCardCount = (status: string) => {
    return localCases.filter(c => c.status === status).length;
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <main className="flex-1 container mx-auto px-2 sm:px-6 lg:px-8 py-4 sm:py-6">
        {/* <h1 className="text-2xl font-bold mb-6">Management Dashboard</h1> */}

        {/* Overview Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6">
          <Card className="py-2">
            <CardHeader className="flex items-center justify-center p-4">
              <CardTitle className="text-lg sm:text-xl font-normal text-gray-600">Total Cases</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="text-3xl sm:text-4xl font-bold flex items-center justify-center">{localCases.length}</div>
            </CardContent>
          </Card>

          <Card className="py-2">
            <CardHeader className="flex items-center justify-center p-4">
              <CardTitle className="text-lg sm:text-xl font-medium text-gray-600">Unassigned Cases</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="text-3xl sm:text-4xl font-bold flex items-center justify-center">{getCardCount('unassigned')}</div>
            </CardContent>
          </Card>

          <Card className="py-2">
            <CardHeader className="flex items-center justify-center p-4">
              <CardTitle className="text-lg sm:text-xl font-medium text-gray-600">Active Lawyers</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="text-3xl sm:text-4xl font-bold flex items-center justify-center">{lawyers.length}</div>
            </CardContent>
          </Card>

          <Card className="py-2">
            <CardHeader className="flex items-center justify-center p-4">
              <CardTitle className="text-lg sm:text-xl font-medium text-gray-600">In Progress</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="text-3xl sm:text-4xl font-bold flex items-center justify-center">{getCardCount('in-progress')}</div>
            </CardContent>
          </Card>
        </div>


        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 px-0 sm:px-4  py-4 sm:py-8">
          <div className="lg:col-span-2">
            <Tabs defaultValue="unassigned">
              <TabsList className="bg-blue-200 w-full h-12">
                <TabsTrigger value="unassigned" className="text-sm sm:text-base">Unassigned Cases</TabsTrigger>
                <TabsTrigger value="lawyers" className="text-sm sm:text-base">Lawyers</TabsTrigger>
                <TabsTrigger value="LawFirm" className="text-sm sm:text-base">Law Firms</TabsTrigger>
              </TabsList>
              <TabsContent value="unassigned" className="pt-4">
                <UnassignedCaseList
                  cases={localCases}
                  onCaseSelect={handleCaseSelect}
                  selectedCaseId={selectedCaseId}
                />
              </TabsContent>
              <TabsContent value="lawyers" className="pt-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  {lawyers.map(lawyer => (
                    <LawyerProfileCard
                      key={lawyer.id}
                      lawyer={lawyer}
                    />
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="LawFirm" className="pt-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  {lawFirms.map(firm => (
                    <LawFirmCard
                      key={firm.id}
                      lawFirm={firm}
                    />
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          <div className="mt-4 lg:mt-0">
            <Card className="py-2">
              <CardHeader className="">
                <CardTitle className="flex items-center justify-center text-lg sm:text-xl font-light text-green-500">Assign Case</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                {!selectedCaseId ? (
                  <div className="text-center py-4 sm:py-6 text-gray-500">
                    Select a case to assign to a lawyer
                  </div>
                ) : (
                  <div className="space-y-3 sm:space-y-4">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Selected Case:</p>
                      <p className="font-medium text-sm sm:text-base">{selectedCase?.title}</p>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <p className="text-sm text-gray-500 mb-2">Case Location:</p>
                      <LocationDropdown onLocationChange={handleLocationChange} />
                    </div>

                    <div className="space-y-2">
                      <p className="text-sm text-gray-500">Assign to:</p>
                      <div className="flex space-x-4">
                        <label className="flex items-center space-x-2">
                          <input
                            type="radio"
                            name="assignTo"
                            value="lawyer"
                            checked={assignTo === "lawyer"}
                            onChange={() => setAssignTo("lawyer")}
                            className="cursor-pointer"
                          />
                          <span className="text-sm">Individual Lawyer</span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input
                            type="radio"
                            name="assignTo"
                            value="firm"
                            checked={assignTo === "firm"}
                            onChange={() => setAssignTo("firm")}
                            className="cursor-pointer"
                          />
                          <span className="text-sm">Law Firm</span>
                        </label>
                      </div>
                    </div>

                    {assignTo === "lawyer" ? (
                      <LawyerSelectDropdown
                        lawyers={lawyers}
                        selectedLawyerId={selectedLawyerId}
                        onSelect={handleLawyerSelect}
                      />
                    ) : (
                      <LawFirmDropdown
                        lawfirms={lawFirms}
                        firmId={selectedLawyerId}
                        onSelect={handleLawyerSelect}
                      />
                    )}

                    <div className="mt-4 sm:mt-6">
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