import AssignCard from "../dashboard/AssignCard";
import CaseStatusCard from "../dashboard/CaseStatusCard";

 

const Dashboard = () => {
  return (
    <div className="container mx-auto px-4 py-6 max-w-5xl">
      <CaseStatusCard 
        trackingId="CC - EW442421915IN"
        status="Pending from Online Legal India"
        deliveryStatus="Delivered"
        approved={{
          date: "dd/mm/yyyy"
        }}
      />
      
      <AssignCard
        advocateName="Lawyer's Name"
        advocateNumber="123456789"
      />
    </div>
  );
};

export default Dashboard;