import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye } from 'lucide-react';

const MyCases = () => {
  // Mock data for cases
  const cases = [
    {
      id: 'CC-EW442421915IN',
      type: 'Consumer Complaint',
      status: 'Pending',
      date: '2023-10-15',
      advocate: 'Sayantani Sarkar'
    },
    {
      id: 'DC-FW892421645IN',
      type: 'Documents Collection',
      status: 'Approved',
      date: '2023-11-27',
      advocate: 'Rahul Sharma'
    },
    {
      id: 'CC-GW552421815IN',
      type: 'Consumer Complaint',
      status: 'Pending',
      date: '2023-12-05',
      advocate: 'Sayantani Sarkar'
    },
  ];

  return (
    <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-6">
      <h1 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6">My Cases</h1>

      {/* Desktop View */}
      <div className="hidden md:block">
        <Card>
          <CardHeader>
            <CardTitle>All Cases</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tracking ID</TableHead>
                  <TableHead>Case Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Assigned Advocate</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cases.map((caseItem) => (
                  <TableRow key={caseItem.id}>
                    <TableCell className="font-medium">{caseItem.id}</TableCell>
                    <TableCell>{caseItem.type}</TableCell>
                    <TableCell>
                      <Badge variant={caseItem.status === 'Approved' ? 'default' : 'destructive'}>
                        {caseItem.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{caseItem.date}</TableCell>
                    <TableCell>{caseItem.advocate}</TableCell>
                    <TableCell>
                      <Button size="sm" variant="outline" className="flex items-center gap-1">
                        <Eye className="h-4 w-4" />
                        <span>View</span>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Mobile View */}
      <div className="md:hidden space-y-4">
        {cases.map((caseItem) => (
          <Card key={caseItem.id}>
            <CardContent className="p-4">
              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Tracking ID</p>
                    <p className="font-medium">{caseItem.id}</p>
                  </div>
                  <Badge variant={caseItem.status === 'Approved' ? 'default' : 'destructive'}>
                    {caseItem.status}
                  </Badge>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Case Type</p>
                  <p>{caseItem.type}</p>
                </div>

                <div>
                  <p className="text-sm font-medium text-muted-foreground">Date</p>
                  <p>{caseItem.date}</p>
                </div>

                <div>
                  <p className="text-sm font-medium text-muted-foreground">Assigned Advocate</p>
                  <p>{caseItem.advocate}</p>
                </div>

                <Button size="sm" variant="outline" className="w-full flex items-center justify-center gap-1">
                  <Eye className="h-4 w-4" />
                  <span>View Details</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MyCases;
