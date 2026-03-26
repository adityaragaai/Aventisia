import React, { useState, useRef, useEffect } from 'react';
import { MoreVertical, Edit2, Trash2 } from 'lucide-react';
import type { KBItem } from './CreateKBDrawer';

interface KBCardProps {
  item: KBItem;
  onEdit: (item: KBItem) => void;
  onDelete: (id: string) => void;
}

const KBCard: React.FC<KBCardProps> = ({ item, onEdit, onDelete }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col hover:border-indigo-100 transition-colors group">
      <div className="flex items-start justify-between mb-2">
        <h3 className="font-semibold text-gray-900">{item.title}</h3>
        
        {/* Dropdown Menu Container */}
        <div className="relative" ref={menuRef}>
          <button 
            onClick={(e) => { e.stopPropagation(); setIsMenuOpen(!isMenuOpen); }}
            className="text-gray-400 hover:text-gray-600 p-1 rounded-md transition-colors"
          >
            <MoreVertical className="w-5 h-5" />
          </button>
          
          {isMenuOpen && (
            <div className="absolute right-0 mt-1 w-36 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-10 overflow-hidden">
              <button
                onClick={(e) => { 
                  e.stopPropagation(); 
                  setIsMenuOpen(false); 
                  onEdit(item); 
                }}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center"
              >
                <Edit2 className="w-4 h-4 mr-2" />
                Edit
              </button>
              <button
                onClick={(e) => { 
                  e.stopPropagation(); 
                  setIsMenuOpen(false); 
                  onDelete(item.id); 
                }}
                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
      
      <p className="text-gray-500 text-sm leading-relaxed mb-6 flex-1 line-clamp-4">
        {item.description}
      </p>

      <div className="pt-4 border-t border-gray-100 mt-auto flex items-center justify-between">
        <span className="text-xs text-gray-400 font-medium">
          Created On: <span className="text-gray-600">{item.createdOn}</span>
        </span>
        <span className="text-xs px-2 py-1 bg-gray-50 rounded text-gray-500 font-medium border border-gray-100">
          {item.vectorStore}
        </span>
      </div>
    </div>
  );
};

export default KBCard;
