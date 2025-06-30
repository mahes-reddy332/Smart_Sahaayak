import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { generateId } from '../../utils/calculations';
import { InventoryItem } from '../../types';

interface InventoryFormProps {
  isOpen: boolean;
  onClose: () => void;
  editItem?: InventoryItem;
}

const InventoryForm: React.FC<InventoryFormProps> = ({ isOpen, onClose, editItem }) => {
  const { dispatch } = useApp();
  const [formData, setFormData] = useState({
    name: editItem?.name || '',
    quantity: editItem?.quantity || 0,
    costPrice: editItem?.costPrice || 0,
    sellingPrice: editItem?.sellingPrice || 0,
    category: editItem?.category || ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const item: InventoryItem = {
      id: editItem?.id || generateId(),
      ...formData,
      createdAt: editItem?.createdAt || new Date(),
      updatedAt: new Date()
    };

    if (editItem) {
      dispatch({ type: 'UPDATE_INVENTORY_ITEM', payload: item });
    } else {
      dispatch({ type: 'ADD_INVENTORY_ITEM', payload: item });
    }

    onClose();
    setFormData({ name: '', quantity: 0, costPrice: 0, sellingPrice: 0, category: '' });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold">
            {editItem ? 'Edit Item' : 'Add New Item'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Item Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <input
              type="text"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., Grains, Oils, etc."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Quantity
              </label>
              <input
                type="number"
                value={formData.quantity}
                onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                min="0"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Cost Price (₹)
              </label>
              <input
                type="number"
                value={formData.costPrice}
                onChange={(e) => setFormData({ ...formData, costPrice: parseFloat(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                min="0"
                step="0.01"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Selling Price (₹)
            </label>
            <input
              type="number"
              value={formData.sellingPrice}
              onChange={(e) => setFormData({ ...formData, sellingPrice: parseFloat(e.target.value) })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              min="0"
              step="0.01"
              required
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center space-x-2"
            >
              <Plus size={20} />
              <span>{editItem ? 'Update' : 'Add'} Item</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InventoryForm;