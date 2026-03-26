import React from 'react';
import { 
  FolderGit2, Cpu, Library, Share2, Server, Layers, Zap, MonitorPlay, 
  PlayCircle, ShieldAlert, BookOpen, KeyRound, Users, Plug, Settings,
  ChevronLeft, ChevronRight
} from 'lucide-react';
import { clsx } from 'clsx';

interface NavItemProps {
  icon: React.ElementType;
  label: string;
  active?: boolean;
  isMinimized?: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ icon: Icon, label, active, isMinimized }) => {
  return (
    <div 
      className={clsx(
        "flex items-center mx-2 my-0.5 rounded-lg cursor-pointer text-sm transition-colors",
        isMinimized ? "justify-center py-2.5 px-0" : "px-4 py-2.5",
        active ? "bg-indigo-50 text-indigo-600 font-medium" : "text-gray-600 hover:bg-gray-100"
      )}
      title={isMinimized ? label : undefined}
    >
      <Icon className={clsx("w-5 h-5 shrink-0", active ? "text-indigo-600" : "text-gray-500", !isMinimized ? "mr-3" : "")} />
      {!isMinimized && <span className="truncate">{label}</span>}
    </div>
  );
};

interface SidebarProps {
  isMinimized: boolean;
  onToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isMinimized, onToggle }) => {
  return (
    <aside className={clsx(
      "h-full bg-white border-r border-gray-200 flex flex-col pt-4 transition-all duration-300 shrink-0 relative",
      isMinimized ? "w-[72px]" : "w-[280px]"
    )}>
      
      {/* Scrollable Container for Navigation items */}
      <div className="flex-1 overflow-y-auto scrollbar-hide flex flex-col pb-4">
        
        <div className="mb-4">
          {!isMinimized && <h3 className="px-6 text-xs font-semibold text-gray-400 tracking-wider mb-2">MY PROJECTS</h3>}
          {isMinimized && <div className="h-4"></div>}
          <NavItem icon={FolderGit2} label="Agents" isMinimized={isMinimized} />
          <NavItem icon={Cpu} label="AI Models" isMinimized={isMinimized} />
          <NavItem icon={Library} label="Library" isMinimized={isMinimized} />
        </div>

        <div className="mb-4">
          {!isMinimized && <h3 className="px-6 text-xs font-semibold text-gray-400 tracking-wider mb-2">ORCHESTRATOR</h3>}
          {isMinimized && <div className="border-t border-gray-100 mx-4 my-3"></div>}
          <NavItem icon={Share2} label="Published" isMinimized={isMinimized} />
          <NavItem icon={Server} label="Machines" isMinimized={isMinimized} />
          <NavItem icon={Layers} label="Queues" isMinimized={isMinimized} />
          <NavItem icon={Zap} label="Triggers" isMinimized={isMinimized} />
          <NavItem icon={MonitorPlay} label="Jobs" isMinimized={isMinimized} />
          <NavItem icon={PlayCircle} label="Executions" isMinimized={isMinimized} />
          <NavItem icon={ShieldAlert} label="Vault" isMinimized={isMinimized} />
          <NavItem icon={BookOpen} label="Knowledge Base" active={true} isMinimized={isMinimized} />
          <NavItem icon={KeyRound} label="Key Store" isMinimized={isMinimized} />
        </div>

        <div className="mb-4">
          {!isMinimized && <h3 className="px-6 text-xs font-semibold text-gray-400 tracking-wider mb-2">ADMIN</h3>}
          {isMinimized && <div className="border-t border-gray-100 mx-4 my-3"></div>}
          <NavItem icon={Users} label="Tenant" isMinimized={isMinimized} />
          <NavItem icon={Plug} label="Integrations" isMinimized={isMinimized} />
          <NavItem icon={Settings} label="Settings" isMinimized={isMinimized} />
        </div>

      </div>

      {/* Floating Toggle Button centered vertically on the right edge */}
      <button 
        onClick={onToggle}
        className="absolute top-1/2 -right-[14px] -translate-y-1/2 w-[28px] h-[28px] bg-white border border-gray-200 rounded-full shadow-sm flex items-center justify-center text-gray-500 hover:text-gray-700 hover:bg-gray-50 transition-colors z-10"
        title={isMinimized ? "Expand sidebar" : "Collapse sidebar"}
      >
        {isMinimized ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4 -ml-0.5" />}
      </button>

    </aside>
  );
};

export default Sidebar;
