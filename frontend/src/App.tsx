import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { TooltipProvider } from "./components/ui/tooltip";
import { Toaster } from "./components/ui/toaster";
import { Toaster as SonnerToaster } from "sonner";
import AppLayout from "./components/UserDashboard/layout/AppLayout";
import Dashboard from "./components/UserDashboard/Pages/Dashboard";

import SubmitCase from "./components/UserDashboard/Pages/SubmitCase";
import Notifications from "./components/UserDashboard/Pages/Notifications";
import NotFound from "./components/UserDashboard/Pages/NotFound";
import { SidebarProvider } from "@/contexts/SidebarContext";
import DocumentPage from "./components/UserDashboard/dashboard/DocumentPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <SonnerToaster />
      <SidebarProvider>
        <BrowserRouter>
          <Routes>
            {/* Parent route with layout */}
            <Route element={<AppLayoutWrapper />}>
              <Route path="/dashboard" element={<Dashboard />} />

              <Route path="/submitcase" element={<SubmitCase />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/docs" element={<DocumentPage />} />
            </Route>

            {/* 404 route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </SidebarProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

// This wraps child routes with AppLayout and lets <Outlet /> render them inside it
const AppLayoutWrapper = () => (
  <AppLayout>
    <Outlet />
  </AppLayout>
);
