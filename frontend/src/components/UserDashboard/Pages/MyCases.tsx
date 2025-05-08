
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
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-semibold mb-6">My Cases</h1>

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
  );
};

export default MyCases;
