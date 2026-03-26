import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isSidebarMinimized, setIsSidebarMinimized] = useState(false);

  return (
    <div className="flex flex-col h-screen w-full bg-[#f9fafc] text-gray-800 font-sans overflow-hidden">
      <Header />
      <div className="flex-1 flex min-h-0">
        <Sidebar isMinimized={isSidebarMinimized} onToggle={() => setIsSidebarMinimized(!isSidebarMinimized)} />
        <main className="flex-1 overflow-y-auto px-6 py-6 pb-20">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
