import React from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
 
interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Sidebar - Fixed */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex flex-col flex-1 h-full">
        {/* Header - Fixed */}
        <Navbar />

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto p-2 relative  ">
          <div className="mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
};



export default AppLayout;
