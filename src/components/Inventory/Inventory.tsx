import React, { useState } from 'react';
import { Plus, Search, Edit, Trash2, Package, AlertTriangle } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { formatCurrency, calculateProfitMargin } from '../../utils/calculations';
import InventoryForm from './InventoryForm';
import { InventoryItem } from '../../types';

const Inventory: React.FC = () => {
  const { state, dispatch } = useApp();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<InventoryItem | undefined>();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredInventory = state.inventory.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (item: InventoryItem) => {
    setEditingItem(item);
    setIsFormOpen(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      dispatch({ type: 'DELETE_INVENTORY_ITEM', payload: id });
    }
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
    setEditingItem(undefined);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Inventory Management</h1>
          <p className="text-gray-600">Manage your stock and track inventory levels</p>
        </div>
        <button
          onClick={() => setIsFormOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
        >
          <Plus size={20} />
          <span>Add Item</span>
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search items..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Inventory Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredInventory.map((item) => {
          const profitMargin = calculateProfitMargin(item.costPrice, item.sellingPrice);
          const isLowStock = item.quantity < 10;
          
          return (
            <div key={item.id} className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${isLowStock ? 'bg-red-100' : 'bg-blue-100'}`}>
                    <Package className={`h-5 w-5 ${isLowStock ? 'text-red-600' : 'text-blue-600'}`} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{item.name}</h3>
                    {item.category && (
                      <p className="text-sm text-gray-500">{item.category}</p>
                    )}
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(item)}
                    className="p-1 text-gray-400 hover:text-blue-600"
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="p-1 text-gray-400 hover:text-red-600"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Quantity</span>
                  <div className="flex items-center space-x-2">
                    <span className={`font-medium ${isLowStock ? 'text-red-600' : 'text-gray-900'}`}>
                      {item.quantity}
                    </span>
                    {isLowStock && <AlertTriangle className="h-4 w-4 text-red-500" />}
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Cost Price</span>
                  <span className="font-medium text-gray-900">{formatCurrency(item.costPrice)}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Selling Price</span>
                  <span className="font-medium text-gray-900">{formatCurrency(item.sellingPrice)}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Profit Margin</span>
                  <span className={`font-medium ${profitMargin > 20 ? 'text-green-600' : profitMargin > 10 ? 'text-yellow-600' : 'text-red-600'}`}>
                    {profitMargin.toFixed(1)}%
                  </span>
                </div>
              </div>

              {isLowStock && (
                <div className="mt-4 p-3 bg-red-50 rounded-lg border border-red-200">
                  <div className="flex items-center space-x-2">
                    <AlertTriangle className="h-4 w-4 text-red-500" />
                    <span className="text-sm text-red-700 font-medium">Low Stock Alert</span>
                  </div>
                  <p className="text-xs text-red-600 mt-1">Consider restocking this item</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {filteredInventory.length === 0 && (
        <div className="text-center py-12">
          <Package className="mx-auto h-24 w-24 text-gray-400" />
          <h3 className="mt-4 text-lg font-medium text-gray-900">No items found</h3>
          <p className="mt-2 text-gray-500">
            {searchTerm ? 'Try searching with different keywords' : 'Get started by adding your first inventory item'}
          </p>
        </div>
      )}

      <InventoryForm
        isOpen={isFormOpen}
        onClose={handleFormClose}
        editItem={editingItem}
      />
    </div>
  );
};

export default Inventory;