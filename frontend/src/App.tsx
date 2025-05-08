import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { TooltipProvider } from "./components/ui/tooltip";
import { Toaster } from "./components/ui/toaster";
import { Toaster as SonnerToaster } from "sonner";
import AppLayout from "./components/UserDashboard/layout/AppLayout";
import Dashboard from "./components/UserDashboard/Pages/Dashboard";
import MyCases from "./components/UserDashboard/Pages/MyCases";
import NotFound from "./components/UserDashboard/Pages/NotFound";
import Notifications from "./components/UserDashboard/Pages/Notifications";
import SubmitCase from "./components/UserDashboard/Pages/SubmitCase";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <SonnerToaster />
      <BrowserRouter>
        <Routes>
          <Route 
            path="/" 
            element={
              <AppLayout>
                <Dashboard />
              </AppLayout>
            } 
          />
          <Route 
            path="/my-cases" 
            element={
              <AppLayout>
                <MyCases />
              </AppLayout>
            } 
          />
          <Route 
            path="/submit-case" 
            element={
              <AppLayout>
                <SubmitCase />
              </AppLayout>
            } 
          />
          <Route 
            path="/notifications" 
            element={
              <AppLayout>
                <Notifications />
              </AppLayout>
            } 
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
