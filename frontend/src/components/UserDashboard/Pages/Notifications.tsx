
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Bell } from 'lucide-react';

const Notifications = () => {
  // Mock notifications data
  const notifications = [
    {
      id: 1,
      title: 'Case Status Update',
      message: 'Your case CC-EW442421915IN has been approved.',
      date: '2023-11-27',
      read: false,
      type: 'update'
    },
    {
      id: 2,
      title: 'Document Required',
      message: 'Please upload identity proof for your case DC-FW892421645IN.',
      date: '2023-11-25',
      read: true,
      type: 'request'
    },
    {
      id: 3,
      title: 'Advocate Assigned',
      message: 'Sayantani Sarkar has been assigned to your case.',
      date: '2023-11-23',
      read: true,
      type: 'info'
    },
    {
      id: 4,
      title: 'Case Hearing',
      message: 'Your case hearing is scheduled for December 15, 2023.',
      date: '2023-11-20',
      read: true,
      type: 'alert'
    },
    {
      id: 5,
      title: 'Document Verified',
      message: 'Your submitted documents have been verified successfully.',
      date: '2023-11-15',
      read: true,
      type: 'success'
    }
  ];

  const getBadgeVariant = (type: string) => {
    switch (type) {
      case 'update':
        return 'default';
      case 'request':
        return 'outline';
      case 'info':
        return 'secondary';
      case 'alert':
        return 'destructive';
      case 'success':
        return 'default';
      default:
        return 'outline';
    }
  };

  return (
    <div className="container mx-auto px-4 py-6 max-w-3xl">
      <h1 className="text-2xl font-semibold mb-6">Notifications</h1>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Recent Notifications</CardTitle>
          <Badge variant="outline" className="ml-2">
            {notifications.filter(n => !n.read).length} New
          </Badge>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {notifications.map((notification) => (
              <div 
                key={notification.id} 
                className={`p-4 border rounded-lg ${!notification.read ? 'bg-blue-50 border-blue-200' : 'bg-white border-gray-200'}`}
              >
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-full ${!notification.read ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-500'}`}>
                    <Bell className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-medium text-gray-900">
                        {notification.title}
                        {!notification.read && (
                          <Badge variant="default" className="ml-2 bg-blue-500">New</Badge>
                        )}
                      </h3>
                      <Badge variant={getBadgeVariant(notification.type)}>
                        {notification.type}
                      </Badge>
                    </div>
                    <p className="text-gray-600 text-sm mb-1">{notification.message}</p>
                    <p className="text-gray-400 text-xs">{notification.date}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Notifications;
