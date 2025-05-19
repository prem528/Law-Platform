import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { Lawyer } from "@/lib/types";

interface LawyerProfileCardProps {
  lawyer: Lawyer;
  isSelected?: boolean;
  onSelect?: (lawyerId: string) => void;
}

const LawyerProfileCard = ({ 
  lawyer, 
  isSelected = false,
  onSelect 
}: LawyerProfileCardProps) => {
  
  const handleClick = () => {
    if (onSelect) {
      onSelect(lawyer.id);
    }
  };

  return (
    <Card 
      className={`transition-all cursor-pointer ${isSelected ? 'ring-2 ring-law-blue-600 shadow-lg' : 'hover:shadow-md'}`}
      onClick={handleClick}
    >
      <CardHeader className="flex flex-row items-center gap-4 pb-2">
        <Avatar className="h-12 w-12">
          <AvatarImage src={lawyer.avatar || ''} alt={lawyer.name} />
          <AvatarFallback className="bg-law-blue-200 text-law-blue-700">
            {lawyer.name.split(' ').map(n => n[0]).join('')}
          </AvatarFallback>
        </Avatar>
        <div>
          <CardTitle className="text-lg">{lawyer.name}</CardTitle>
          <div className="flex items-center">
            <Badge className="bg-law-blue-100 text-law-blue-800 hover:bg-law-blue-200">
              {lawyer.specialization}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="flex flex-col">
            <span className="text-gray-500">Email</span>
            <span>{lawyer.email}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-gray-500">Phone</span>
            <span>{lawyer.phone || 'Not provided'}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-gray-500">Experience</span>
            <span>{lawyer.experience} years</span>
          </div>
          <div className="flex flex-col">
            <span className="text-gray-500">Current Cases</span>
            <span className="font-medium">{lawyer.caseLoad}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LawyerProfileCard;
