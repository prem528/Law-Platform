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
          date: "2023-11-27"
        }}
      />
      
      <AssignCard
        advocateName="Sayantani Sarkar"
        advocateNumber="8069021542"
      />
    </div>
  );
};

export default Dashboard;