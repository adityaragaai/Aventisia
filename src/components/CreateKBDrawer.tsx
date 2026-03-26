import React, { useState, useEffect } from 'react';
import { X, ChevronDown } from 'lucide-react';
import { clsx } from 'clsx';

export interface KBItem {
  id: string;
  title: string;
  description: string;
  vectorStore: string;
  llmModel: string;
  createdOn: string;
}

interface CreateKBDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (item: KBItem) => void;
  editingItem?: KBItem | null;
}

const CreateKBDrawer: React.FC<CreateKBDrawerProps> = ({ isOpen, onClose, onSave, editingItem }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [vectorStore, setVectorStore] = useState('Qdrant');
  const [llmModel, setLlmModel] = useState('text-embedding-ada-002');
  
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      if (editingItem) {
        setName(editingItem.title);
        setDescription(editingItem.description);
        setVectorStore(editingItem.vectorStore || 'Qdrant');
        setLlmModel(editingItem.llmModel || 'text-embedding-ada-002');
      } else {
        setName('');
        setDescription('');
        setVectorStore('Qdrant');
        setLlmModel('text-embedding-ada-002');
      }
      setError('');
    }
  }, [isOpen, editingItem]);

  const handleClose = () => {
    onClose();
  };

  const handleCreate = () => {
    if (!name.trim()) {
      setError('Name is required.');
      return;
    }

    if (editingItem) {
      onSave({
        ...editingItem,
        description: description.trim() || 'No description provided.',
        vectorStore,
        llmModel
      });
    } else {
      const today = new Date();
      const formattedDate = `${today.getDate().toString().padStart(2, '0')}/${(today.getMonth() + 1).toString().padStart(2, '0')}/${today.getFullYear()}`;
      
      onSave({
        id: Math.random().toString(36).substr(2, 9),
        title: name.trim(),
        description: description.trim() || 'No description provided.',
        vectorStore,
        llmModel,
        createdOn: formattedDate
      });
    }

    handleClose();
  };

  const isEditing = !!editingItem;

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 transition-opacity"
          onClick={handleClose}
        />
      )}

      {/* Drawer */}
      <div 
        className={clsx(
          "fixed top-0 right-0 h-full w-[450px] bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* Header */}
        <div className="flex items-start justify-between p-6 border-b border-gray-100">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-1">
              {isEditing ? 'Edit Knowledge Base' : 'Create New Knowledge Base'}
            </h2>
            <p className="text-sm text-gray-500">
              {isEditing ? 'Update your knowledge base configuration.' : 'Best for quick answers from documents, websites and text files.'}
            </p>
          </div>
          <button 
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body / Form */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Name <span className="text-gray-500 font-normal">{isEditing ? '(Cannot be edited)' : '(Cannot be edited later)'}</span>{!isEditing && <span className="text-red-500">*</span>}
            </label>
            <input 
              type="text" 
              placeholder="Name" 
              value={name}
              onChange={(e) => { setName(e.target.value); setError(''); }}
              disabled={isEditing}
              className={clsx(
                "w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20",
                error ? "border-red-500" : "border-gray-200",
                isEditing && "bg-gray-50 text-gray-500 cursor-not-allowed"
              )}
            />
            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Description
            </label>
            <textarea 
              placeholder="Description" 
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Vector Store<span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <select 
                value={vectorStore}
                onChange={(e) => setVectorStore(e.target.value)}
                className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500/20 bg-white cursor-pointer text-gray-600"
              >
                <option value="Qdrant">Qdrant</option>
                <option value="Pinecone">Pinecone</option>
                <option value="Chroma">Chroma</option>
              </select>
              <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              LLM Embedding Model<span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <select 
                value={llmModel}
                onChange={(e) => setLlmModel(e.target.value)}
                className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500/20 bg-white cursor-pointer text-gray-600"
              >
                <option value="text-embedding-ada-002">text-embedding-ada-002</option>
                <option value="text-embedding-3-small">text-embedding-3-small</option>
                <option value="text-embedding-3-large">text-embedding-3-large</option>
              </select>
              <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-100 mt-auto flex justify-end space-x-3">
          <button 
            onClick={handleClose}
            className="px-6 py-2 bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 rounded-md transition-colors text-sm font-medium"
          >
            Cancel
          </button>
          <button 
            onClick={handleCreate}
            className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md transition-colors text-sm font-medium"
          >
            {isEditing ? 'Save Changes' : 'Create'}
          </button>
        </div>

      </div>
    </>
  );
};

export default CreateKBDrawer;
