import React, { useState } from 'react';
import { ShoppingCart, Plus, Calendar, TrendingUp } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { formatCurrency, formatDate, generateId, calculateProfit, getTodaysSales, getTotalRevenue } from '../../utils/calculations';
import { Sale } from '../../types';

const Sales: React.FC = () => {
  const { state, dispatch } = useApp();
  const [selectedItemId, setSelectedItemId] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [showForm, setShowForm] = useState(false);

  const selectedItem = state.inventory.find(item => item.id === selectedItemId);
  const todaysSales = getTodaysSales(state.sales);
  const todaysRevenue = getTotalRevenue(todaysSales);

  const handleSale = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedItem || quantity <= 0 || quantity > selectedItem.quantity) {
      alert('Invalid quantity or item not selected');
      return;
    }

    const totalAmount = selectedItem.sellingPrice * quantity;
    const profit = calculateProfit(selectedItem.costPrice, selectedItem.sellingPrice, quantity);

    const sale: Sale = {
      id: generateId(),
      itemId: selectedItem.id,
      itemName: selectedItem.name,
      quantitySold: quantity,
      unitPrice: selectedItem.sellingPrice,
      totalAmount,
      profit,
      createdAt: new Date()
    };

    dispatch({ type: 'ADD_SALE', payload: sale });
    dispatch({ type: 'UPDATE_INVENTORY_AFTER_SALE', payload: { itemId: selectedItem.id, quantitySold: quantity } });

    // Reset form
    setSelectedItemId('');
    setQuantity(1);
    setShowForm(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Sales Management</h1>
          <p className="text-gray-600">Record sales and track your daily revenue</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center space-x-2"
        >
          <Plus size={20} />
          <span>Record Sale</span>
        </button>
      </div>

      {/* Today's Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-blue-100 rounded-lg">
              <ShoppingCart className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Today's Sales</p>
              <p className="text-2xl font-bold text-gray-900">{todaysSales.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-green-100 rounded-lg">
              <TrendingUp className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Today's Revenue</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(todaysRevenue)}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-purple-100 rounded-lg">
              <Calendar className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Avg. Sale Value</p>
              <p className="text-2xl font-bold text-gray-900">
                {todaysSales.length > 0 ? formatCurrency(todaysRevenue / todaysSales.length) : formatCurrency(0)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Sales Form */}
      {showForm && (
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Record New Sale</h3>
          
          <form onSubmit={handleSale} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Select Item
                </label>
                <select
                  value={selectedItemId}
                  onChange={(e) => setSelectedItemId(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                >
                  <option value="">Choose an item...</option>
                  {state.inventory
                    .filter(item => item.quantity > 0)
                    .map(item => (
                      <option key={item.id} value={item.id}>
                        {item.name} (Stock: {item.quantity}) - {formatCurrency(item.sellingPrice)}
                      </option>
                    ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Quantity
                </label>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value))}
                  min="1"
                  max={selectedItem?.quantity || 1}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>
            </div>

            {selectedItem && (
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">Sale Summary</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Unit Price:</span>
                    <span className="ml-2 font-medium">{formatCurrency(selectedItem.sellingPrice)}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Total Amount:</span>
                    <span className="ml-2 font-medium text-green-600">
                      {formatCurrency(selectedItem.sellingPrice * quantity)}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600">Profit per unit:</span>
                    <span className="ml-2 font-medium">{formatCurrency(selectedItem.sellingPrice - selectedItem.costPrice)}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Total Profit:</span>
                    <span className="ml-2 font-medium text-green-600">
                      {formatCurrency((selectedItem.sellingPrice - selectedItem.costPrice) * quantity)}
                    </span>
                  </div>
                </div>
              </div>
            )}

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                Record Sale
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Sales History */}
      <div className="bg-white rounded-xl shadow-md border border-gray-100">
        <div className="p-6 border-b">
          <h3 className="text-lg font-semibold text-gray-900">Recent Sales</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Item
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Quantity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Unit Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Profit
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {state.sales.slice().reverse().map((sale) => (
                <tr key={sale.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">{sale.itemName}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                    {sale.quantitySold}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                    {formatCurrency(sale.unitPrice)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="font-medium text-green-600">{formatCurrency(sale.totalAmount)}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="font-medium text-blue-600">{formatCurrency(sale.profit)}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(sale.createdAt)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Sales;