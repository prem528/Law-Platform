import React from 'react';
import { ChevronDown, Plus, CloudUpload } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface CaseStatusCardProps {
  trackingId: string;
  status: string;
  deliveryStatus?: string;
  approved?: {
    date: string;
  };
}

const CaseStatusCard: React.FC<CaseStatusCardProps> = ({ 
  trackingId, 
  status,
  deliveryStatus,
  approved
}) => {
  return (
    <Card className="w-full shadow-md">
      <CardHeader className="flex flex-row items-center justify-between bg-white rounded-t-lg">
        <CardTitle className="text-xl font-medium">Status</CardTitle>
        <div className="flex items-center gap-2">
          <span className="bg-legal-red text-white text-sm py-1 px-3 rounded-md">
            {status}
          </span>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <ChevronDown className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="pt-6 px-6">
        <div className="space-y-6">
          <div>
            <h3 className="font-medium text-gray-700 mb-2">Customer</h3>
            <div className="bg-legal-pink rounded-lg p-4">
              <p className="text-sm mb-1">Tracking ID</p>
              <p className="font-medium">{trackingId}</p>
            </div>
          </div>

          {deliveryStatus && (
            <div>
              <div className="bg-legal-blue rounded-lg p-4">
                <p className="text-sm mb-1">Delivery Status</p>
                <p className="font-medium">{deliveryStatus}</p>
                <Button variant="link" className="text-blue-600 p-0 h-auto mt-2">
                  View Track Consignment
                </Button>
              </div>
            </div>
          )}

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-legal-yellow rounded-lg p-4 flex flex-col items-center justify-center h-32">
              <Plus className="h-8 w-8 text-amber-600 mb-2" />
              <p className="text-center text-sm text-amber-800">View Required & Upload Files</p>
            </div>
            
            {[1, 2, 3, 4, 5].map((item) => (
              <div 
                key={item}
                className="bg-legal-green rounded-lg p-4 flex flex-col items-center justify-center h-32"
              >
                <CloudUpload className="h-8 w-8 text-green-600 mb-2" />
                <p className="text-center text-sm text-green-800">Customer's File</p>
              </div>
            ))}
          </div>

          {approved && (
            <div className="mt-4">
              <p className="text-green-700 font-medium">
                Approved ({approved.date})
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default CaseStatusCard;
