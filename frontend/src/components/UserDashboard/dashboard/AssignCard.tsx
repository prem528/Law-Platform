import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AssignCardProps {
  advocateName: string;
  advocateNumber: string;
}

const AssignCard: React.FC<AssignCardProps> = ({ advocateName, advocateNumber }) => {
  return (
    <Card className="w-full shadow-md mt-6">
      <CardHeader className="flex flex-row items-center justify-between bg-white rounded-t-lg">
        <CardTitle className="text-xl font-medium">Assign To</CardTitle>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <ChevronDown className="h-4 w-4" />
        </Button>
      </CardHeader>

      <CardContent className="pt-6 px-6">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
            <div className="w-32 h-28 border border-gray-200 rounded-md flex items-center justify-center bg-white">
              <img 
                src="/lovable-uploads/2f1bbe8b-519a-40b8-a1cc-d6cd5a73ccbe.png" 
                alt="Advocate Profile" 
                className="w-28 opacity-30"
              />
            </div>
          </div>

          <div className="flex-1">
            <div className="mb-4">
              <p className="text-sm text-gray-500">Advocate Name :</p>
              <p className="font-medium text-gray-800">{advocateName}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Advocate Number :</p>
              <p className="font-medium text-gray-800">{advocateNumber}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AssignCard;
