import { useAuth } from "@/contexts/AuthContext";
import { Outlet } from "react-router-dom";
import AppLayout from "./AppLayout";


const AppLayoutWrapper = () => {
  const { loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center space-x-2">
        <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full"></div>
        <span className="text-blue-500 font-medium">Checking authentication...</span>
      </div>
       
    );
  }

  return (
    <AppLayout>
      <Outlet />
    </AppLayout>
  );
};

export default AppLayoutWrapper;
