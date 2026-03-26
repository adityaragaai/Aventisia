import React from 'react';
import { Search, Bell, ChevronDown } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="h-16 bg-[#1A1642] text-white flex items-center justify-between px-6 shrink-0">
      
      {/* Logo & Workspace Dropdown */}
      <div className="flex items-center space-x-6">
        <div className="flex items-center space-x-2">
          {/* Custom logo icon resembling the design */}
          <div className="w-8 h-8 rounded bg-indigo-600 flex items-center justify-center">
            <span className="font-bold text-lg leading-none">a</span>
          </div>
          <span className="text-xl font-medium tracking-wide">Worcspace</span>
        </div>
        
        <div className="flex items-center bg-[#292461] px-3 py-1.5 rounded text-sm cursor-pointer hover:bg-[#342D7A] transition-colors">
          <span>Worcspace 1</span>
          <ChevronDown className="w-4 h-4 ml-2 text-gray-400" />
        </div>
      </div>

      {/* Search Bar */}
      <div className="flex-1 max-w-xl mx-8">
        <div className="relative flex items-center">
          <Search className="w-4 h-4 absolute left-3 text-indigo-300" />
          <input 
            type="text" 
            placeholder="Search..." 
            className="w-full bg-[#292461] text-indigo-100 placeholder-indigo-300/80 rounded py-2 pl-9 pr-12 focus:outline-none focus:ring-1 focus:ring-indigo-500 text-sm"
          />
          <span className="absolute right-3 text-xs text-indigo-300 font-medium">⌘K</span>
        </div>
      </div>

      {/* Right Icons */}
      <div className="flex items-center space-x-4">
        <button className="text-indigo-200 hover:text-white transition-colors relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border border-[#1A1642]"></span>
        </button>
        <div className="w-8 h-8 rounded-full bg-indigo-300 flex items-center justify-center text-indigo-900 font-medium cursor-pointer">
          GK
        </div>
      </div>

    </header>
  );
};

export default Header;
