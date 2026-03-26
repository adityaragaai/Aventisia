import React, { useState } from 'react';
import { Search, Plus, ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';
import KBCard from '../components/KBCard';
import CreateKBDrawer from '../components/CreateKBDrawer';
import type { KBItem } from '../components/CreateKBDrawer';

const INITIAL_MOCK_DATA: KBItem[] = Array(6).fill(null).map((_, i) => ({
  id: `mock-id-${i}`,
  title: `Test ${i + 1}`,
  description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy',
  vectorStore: 'Qdrant',
  llmModel: 'text-embedding-ada-002',
  createdOn: '14/07/2025'
}));

const KnowledgeBase: React.FC = () => {
  const [data, setData] = useState<KBItem[]>(INITIAL_MOCK_DATA);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<KBItem | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredData = data.filter(item => 
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    item.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSaveItem = (savedItem: KBItem) => {
    // If it exists, update it
    if (data.find(i => i.id === savedItem.id)) {
      setData(data.map(i => i.id === savedItem.id ? savedItem : i));
    } else {
      // Otherwise, add it to the top
      setData([savedItem, ...data]);
    }
  };

  const handleDeleteItem = (id: string) => {
    setData(data.filter(i => i.id !== id));
  };

  const handleEditItem = (item: KBItem) => {
    setEditingItem(item);
    setIsDrawerOpen(true);
  };

  const openCreateDrawer = () => {
    setEditingItem(null);
    setIsDrawerOpen(true);
  };

  return (
    <div className="h-full flex flex-col relative w-full">
      {/* Header section */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Knowledge Base</h1>
        
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500/20 text-sm w-64 bg-white"
            />
          </div>
          <button 
            onClick={openCreateDrawer}
            className="flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md transition-colors text-sm font-medium"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create New
          </button>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 flex-1 content-start pb-20">
        {filteredData.map((item) => (
          <KBCard 
            key={item.id} 
            item={item} 
            onEdit={handleEditItem}
            onDelete={handleDeleteItem}
          />
        ))}
        {filteredData.length === 0 && (
          <div className="col-span-full py-12 text-center text-gray-500 bg-white rounded border border-dashed border-gray-300">
            {data.length === 0 ? "No Knowledge Bases found. Click 'Create New' to add one." : "No results match your search."}
          </div>
        )}
      </div>

      {/* Footer / Pagination */}
      <div className="flex items-center justify-between mt-auto pt-4 pb-2 text-sm text-gray-600 w-full shrink-0">
        <div className="font-medium">{filteredData.length} row{filteredData.length !== 1 && 's'}</div>
        
        <div className="flex items-center space-x-6">
          <div className="flex items-center">
            <span className="mr-3">Rows per page</span>
            <div className="flex items-center border border-gray-200 rounded px-2 py-1 cursor-pointer bg-white">
              <span>10</span>
              <ChevronDown className="w-4 h-4 ml-2 text-gray-500" />
            </div>
          </div>
          
          <div className="flex items-center">
            <span className="mr-4">page 1 of 1</span>
            <div className="flex border border-gray-200 rounded bg-white overflow-hidden">
              <button className="px-2 py-1 border-r border-gray-200 hover:bg-gray-50 text-gray-400" disabled><ChevronLeft className="w-4 h-4" /><ChevronLeft className="w-4 h-4 absolute opacity-0" /></button>
              <button className="px-2 py-1 border-r border-gray-200 hover:bg-gray-50 text-gray-400" disabled><ChevronLeft className="w-4 h-4" /></button>
              <button className="px-2 py-1 border-r border-gray-200 hover:bg-gray-50 text-gray-400" disabled><ChevronRight className="w-4 h-4" /></button>
              <button className="px-2 py-1 hover:bg-gray-50 text-gray-400" disabled><ChevronRight className="w-4 h-4" /><ChevronRight className="w-4 h-4 absolute opacity-0" /></button>
            </div>
          </div>
        </div>
      </div>

      <CreateKBDrawer 
        isOpen={isDrawerOpen} 
        onClose={() => setIsDrawerOpen(false)} 
        onSave={handleSaveItem}
        editingItem={editingItem}
      />
    </div>
  );
};

export default KnowledgeBase;
