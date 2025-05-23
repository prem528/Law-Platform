import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { TooltipProvider } from "./components/ui/tooltip";
import { Toaster } from "./components/ui/toaster";
import { Toaster as SonnerToaster } from "sonner";
import Dashboard from "./components/UserDashboard/Pages/Dashboard";
import Notifications from "./components/UserDashboard/Pages/Notifications";
import NotFound from "./components/UserDashboard/Pages/NotFound";
import { SidebarProvider } from "@/contexts/SidebarContext";
import DocumentPage from "./components/UserDashboard/dashboard/DocumentPage";
import CaseForm from "./components/UserDashboard/dashboard/CaseForm";
import Login from "./components/authentication/AuthPage/Login";
import Register from "./components/authentication/AuthPage/Register";
import PrivateRoute from "./Routes/PrivateRoute";
import AppLayoutWrapper from "./components/UserDashboard/layout/AppLayoutWrapper";
import ManagementDashboard from "./components/Management/Pages/ManagementDashboard";
import ManagementLayoutWrapper from "./components/Management/layout/ManagementLayoutWrapper";
import Cases from "./components/Management/Pages/Cases";
import Lawyers from "./components/Management/Pages/Lawyers";
import CaseTable from "./components/Management/Pages/testTable";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <SonnerToaster />
      <SidebarProvider>
        <BrowserRouter>
          <Routes>
          
            {/* User Routes inside AppLayout */}
            <Route element={<AppLayoutWrapper />}>
              <Route element={<PrivateRoute />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/notifications" element={<Notifications />} />
                <Route path="/docs" element={<DocumentPage />} />
                <Route path="/form" element={<CaseForm />} />
              </Route>
            </Route>

            {/* Management Routes inside ManagementLayout */}
            <Route element={<ManagementLayoutWrapper />}>
              <Route element={<PrivateRoute />}>
                <Route path="/management" element={<ManagementDashboard />} />
                <Route path="lawyers" element={<Lawyers/>} />
                <Route path="cases" element={<Cases/>} />
                <Route path="test" element={<CaseTable/>} />
              </Route>
            </Route>



            {/* Authentication Page */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />


            {/* 404 route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </SidebarProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;


