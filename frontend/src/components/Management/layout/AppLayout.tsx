import React from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <div className="flex flex-col md:flex-row h-screen bg-background overflow-hidden">
      {/* Sidebar - Fixed on md+, stacked on mobile */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex flex-col flex-1 h-full">
        {/* Header */}
        <Navbar />

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto overflow-x-auto p-2 w-full">
          <div className="w-full">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
