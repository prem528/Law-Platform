import { useState } from "react";
import LawyerProfileCard from "../components/LawyerProfileCard";
import { lawyers } from "@/lib/data";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";


const Lawyers = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredLawyers = lawyers.filter(lawyer => 
    lawyer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lawyer.specialization.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col px-16">
       

      <main className="flex-1 container py-6">
        <h1 className="text-2xl font-bold mb-6">Lawyers Directory</h1>

        <div className="flex items-center mb-6">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Search lawyers by name or specialization"
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLawyers.length > 0 ? (
            filteredLawyers.map(lawyer => (
              <LawyerProfileCard key={lawyer.id} lawyer={lawyer} />
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center p-8 text-center bg-white rounded-lg border border-dashed">
              <p className="text-gray-500 mb-2">No lawyers found</p>
              <p className="text-sm text-gray-400">Try different search terms</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Lawyers;
