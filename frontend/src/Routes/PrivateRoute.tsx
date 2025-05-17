// src/routes/PrivateRoute.tsx

import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const PrivateRoute = () => {
  const auth = useAuth();

  if (!auth?.isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;
