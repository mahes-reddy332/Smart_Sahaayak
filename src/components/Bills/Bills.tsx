import React, { useState } from 'react';
import { Receipt, Download, Eye, Calendar } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { formatCurrency, formatDate } from '../../utils/calculations';

const Bills: React.FC = () => {
  const { state } = useApp();
  const [selectedSale, setSelectedSale] = useState<string | null>(null);

  const handlePrint = (saleId: string) => {
    const sale = state.sales.find(s => s.id === saleId);
    if (!sale) return;

    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const printContent = `
      <html>
        <head>
          <title>Receipt - ${sale.itemName}</title>
          <style>
            body { font-family: Arial, sans-serif; max-width: 400px; margin: 0 auto; padding: 20px; }
            .header { text-align: center; border-bottom: 2px solid #000; padding-bottom: 10px; margin-bottom: 20px; }
            .row { display: flex; justify-content: space-between; margin: 10px 0; }
            .total { border-top: 2px solid #000; padding-top: 10px; font-weight: bold; font-size: 18px; }
            .footer { text-align: center; margin-top: 20px; font-size: 12px; color: #666; }
          </style>
        </head>
        <body>
          <div class="header">
            <h2>Your Business Store</h2>
            <p>Receipt #${sale.id.slice(-6)}</p>
          </div>
          
          <div class="row">
            <span>Date:</span>
            <span>${formatDate(sale.createdAt)}</span>
          </div>
          
          <div class="row">
            <span>Item:</span>
            <span>${sale.itemName}</span>
          </div>
          
          <div class="row">
            <span>Quantity:</span>
            <span>${sale.quantitySold}</span>
          </div>
          
          <div class="row">
            <span>Unit Price:</span>
            <span>${formatCurrency(sale.unitPrice)}</span>
          </div>
          
          <div class="row total">
            <span>Total Amount:</span>
            <span>${formatCurrency(sale.totalAmount)}</span>
          </div>
          
          <div class="footer">
            <p>Thank you for your business!</p>
            <p>Built with Business Assistant</p>
          </div>
        </body>
      </html>
    `;

    printWindow.document.write(printContent);
    printWindow.document.close();
    printWindow.print();
  };

  const BillPreview = ({ saleId }: { saleId: string }) => {
    const sale = state.sales.find(s => s.id === saleId);
    if (!sale) return null;

    return (
      <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
        <div className="text-center border-b pb-4 mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Your Business Store</h2>
          <p className="text-gray-600">Receipt #{sale.id.slice(-6)}</p>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="text-gray-600">Date:</span>
            <span className="font-medium">{formatDate(sale.createdAt)}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-600">Item:</span>
            <span className="font-medium">{sale.itemName}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-600">Quantity:</span>
            <span className="font-medium">{sale.quantitySold}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-600">Unit Price:</span>
            <span className="font-medium">{formatCurrency(sale.unitPrice)}</span>
          </div>

          <div className="flex justify-between border-t pt-4 text-lg font-bold">
            <span>Total Amount:</span>
            <span className="text-green-600">{formatCurrency(sale.totalAmount)}</span>
          </div>
        </div>

        <div className="text-center mt-6 pt-4 border-t">
          <p className="text-gray-600">Thank you for your business!</p>
          <p className="text-sm text-gray-500 mt-2">Built with Business Assistant</p>
        </div>

        <div className="flex justify-center space-x-4 mt-6">
          <button
            onClick={() => handlePrint(sale.id)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
          >
            <Download size={20} />
            <span>Print Receipt</span>
          </button>
          <button
            onClick={() => setSelectedSale(null)}
            className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
          >
            Close
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Bills & Receipts</h1>
        <p className="text-gray-600">View and print receipts for your sales</p>
      </div>

      {selectedSale ? (
        <BillPreview saleId={selectedSale} />
      ) : (
        <>
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Receipt className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Receipts</p>
                  <p className="text-2xl font-bold text-gray-900">{state.sales.length}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-green-100 rounded-lg">
                  <Calendar className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">This Month</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {state.sales.filter(sale => {
                      const saleDate = new Date(sale.createdAt);
                      const now = new Date();
                      return saleDate.getMonth() === now.getMonth() && saleDate.getFullYear() === now.getFullYear();
                    }).length}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <Download className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Avg. Bill Value</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {state.sales.length > 0 
                      ? formatCurrency(state.sales.reduce((sum, sale) => sum + sale.totalAmount, 0) / state.sales.length)
                      : formatCurrency(0)
                    }
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Bills List */}
          <div className="bg-white rounded-xl shadow-md border border-gray-100">
            <div className="p-6 border-b">
              <h3 className="text-lg font-semibold text-gray-900">All Receipts</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Receipt #
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Item
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {state.sales.slice().reverse().map((sale) => (
                    <tr key={sale.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium text-gray-900">#{sale.id.slice(-6)}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-gray-900">{sale.itemName}</div>
                        <div className="text-sm text-gray-500">Qty: {sale.quantitySold}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="font-medium text-green-600">{formatCurrency(sale.totalAmount)}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(sale.createdAt)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm space-x-2">
                        <button
                          onClick={() => setSelectedSale(sale.id)}
                          className="text-blue-600 hover:text-blue-900 flex items-center space-x-1"
                        >
                          <Eye size={16} />
                          <span>View</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {state.sales.length === 0 && (
              <div className="text-center py-12">
                <Receipt className="mx-auto h-24 w-24 text-gray-400" />
                <h3 className="mt-4 text-lg font-medium text-gray-900">No receipts yet</h3>
                <p className="mt-2 text-gray-500">Start making sales to generate receipts</p>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Bills;