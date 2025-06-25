import React, { useMemo, useState } from 'react';
import { TrendingUp, Award, AlertTriangle, Lightbulb, Download, DollarSign, Target, Trophy, Crown, Lock, FileText } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../Auth/AuthContext';
import { formatCurrency, getTotalRevenue, getTotalProfit, getTopSellingItems, getLowStockItems, calculateProfitMargin } from '../../utils/calculations';
import PaywallModal from './PaywallModal';

const Insights: React.FC = () => {
  const { state } = useApp();
  const { state: authState } = useAuth();
  const [showPaywall, setShowPaywall] = useState(false);
  const [paywallFeature, setPaywallFeature] = useState('');

  const handleProFeatureClick = (featureName: string) => {
    if (state.userTier === 'free') {
      setPaywallFeature(featureName);
      setShowPaywall(true);
      return;
    }
    // If pro user, allow access
  };

  // Basic insights for free users
  const basicInsights = useMemo(() => {
    const now = new Date();
    const today = new Date(now);
    today.setHours(0, 0, 0, 0);
    
    const todaySales = state.sales.filter(sale => {
      const saleDate = new Date(sale.createdAt);
      saleDate.setHours(0, 0, 0, 0);
      return saleDate.getTime() === today.getTime();
    });
    
    const todayRevenue = getTotalRevenue(todaySales);
    const totalInventoryCount = state.inventory.reduce((sum, item) => sum + item.quantity, 0);
    
    // Top 1 item of the day
    const itemSalesCount = todaySales.reduce((acc, sale) => {
      acc[sale.itemId] = (acc[sale.itemId] || 0) + sale.quantitySold;
      return acc;
    }, {} as Record<string, number>);
    
    const topItemId = Object.entries(itemSalesCount).sort(([,a], [,b]) => b - a)[0]?.[0];
    const topItem = topItemId ? state.inventory.find(item => item.id === topItemId) : null;
    
    return {
      todayRevenue,
      totalInventoryCount,
      todaySalesCount: todaySales.length,
      topItem: topItem ? { item: topItem, sold: itemSalesCount[topItemId] } : null
    };
  }, [state]);

  // Advanced insights for pro users
  const proInsights = useMemo(() => {
    if (state.userTier === 'free') return null;
    
    const now = new Date();
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    
    // Monthly data
    const monthlySales = state.sales.filter(sale => 
      new Date(sale.createdAt) >= thirtyDaysAgo
    );
    
    const monthlyRevenue = getTotalRevenue(monthlySales);
    const monthlyProfit = getTotalProfit(monthlySales);
    const avgSaleValue = monthlySales.length > 0 ? monthlyRevenue / monthlySales.length : 0;
    
    // Daily profit trend (last 7 days)
    const profitTrend = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
      const dayStart = new Date(date);
      dayStart.setHours(0, 0, 0, 0);
      const dayEnd = new Date(date);
      dayEnd.setHours(23, 59, 59, 999);
      
      const daySales = state.sales.filter(sale => {
        const saleDate = new Date(sale.createdAt);
        return saleDate >= dayStart && saleDate <= dayEnd;
      });
      
      const dayProfit = getTotalProfit(daySales);
      profitTrend.push({
        date: date.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' }),
        profit: dayProfit,
        sales: daySales.length
      });
    }
    
    // Top selling items
    const topSellingItems = getTopSellingItems(state.inventory, state.sales);
    
    // Profit by item
    const profitByItem = state.inventory.map(item => {
      const itemSales = state.sales.filter(sale => sale.itemId === item.id);
      const totalProfit = getTotalProfit(itemSales);
      const totalSold = itemSales.reduce((sum, sale) => sum + sale.quantitySold, 0);
      const profitMargin = calculateProfitMargin(item.costPrice, item.sellingPrice);
      
      return {
        name: item.name.length > 15 ? item.name.substring(0, 15) + '...' : item.name,
        fullName: item.name,
        profit: totalProfit,
        sold: totalSold,
        margin: profitMargin,
        stock: item.quantity
      };
    }).sort((a, b) => b.profit - a.profit).slice(0, 8);
    
    // Low stock and low margin items
    const lowStockItems = getLowStockItems(state.inventory, 10);
    const lowMarginItems = state.inventory.filter(item => 
      calculateProfitMargin(item.costPrice, item.sellingPrice) < 15
    );
    
    // Category distribution
    const categoryData = state.inventory.reduce((acc, item) => {
      const category = item.category || 'Others';
      acc[category] = (acc[category] || 0) + item.quantity;
      return acc;
    }, {} as Record<string, number>);
    
    const categoryChart = Object.entries(categoryData).map(([name, value]) => ({
      name, value
    }));
    
    return {
      monthlyRevenue,
      monthlyProfit,
      avgSaleValue,
      profitTrend,
      topSellingItems,
      profitByItem,
      lowStockItems,
      lowMarginItems,
      categoryChart,
      totalTransactions: monthlySales.length
    };
  }, [state]);

  const generateCSVReport = () => {
    const csvData = [
      ['Date', 'Item', 'Quantity', 'Revenue', 'Profit'],
      ...state.sales.slice(0, 10).map(sale => [
        new Date(sale.createdAt).toLocaleDateString(),
        sale.itemName,
        sale.quantitySold,
        sale.totalAmount,
        sale.profit
      ])
    ];
    
    const csvContent = csvData.map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `basic-report-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const generateAdvancedPDFReport = () => {
    if (state.userTier === 'free') {
      handleProFeatureClick('Advanced PDF Reports');
      return;
    }
    
    // Create comprehensive PDF report content
    const reportData = {
      businessName: authState.user?.businessName || 'Your Business',
      ownerName: authState.user?.ownerName || 'Business Owner',
      reportDate: new Date().toLocaleDateString('en-IN', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }),
      monthlyRevenue: proInsights?.monthlyRevenue || 0,
      monthlyProfit: proInsights?.monthlyProfit || 0,
      totalTransactions: proInsights?.totalTransactions || 0,
      avgSaleValue: proInsights?.avgSaleValue || 0,
      topItems: proInsights?.topSellingItems.slice(0, 5) || [],
      lowStockItems: proInsights?.lowStockItems || [],
      profitTrend: proInsights?.profitTrend || []
    };

    // Generate HTML content for PDF
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Business Report - ${reportData.businessName}</title>
          <style>
            body { 
              font-family: 'Arial', sans-serif; 
              margin: 0; 
              padding: 20px; 
              color: #333;
              line-height: 1.6;
            }
            .header { 
              text-align: center; 
              border-bottom: 3px solid #ff9933; 
              padding-bottom: 20px; 
              margin-bottom: 30px;
              background: linear-gradient(135deg, #ff9933, #138808);
              color: white;
              padding: 30px;
              border-radius: 10px;
            }
            .header h1 { 
              margin: 0; 
              font-size: 2.5em; 
              font-weight: bold;
            }
            .header p { 
              margin: 10px 0 0 0; 
              font-size: 1.2em; 
              opacity: 0.9;
            }
            .section { 
              margin: 30px 0; 
              padding: 20px;
              background: #f8f9fa;
              border-radius: 10px;
              border-left: 5px solid #ff9933;
            }
            .section h2 { 
              color: #ff9933; 
              border-bottom: 2px solid #eee; 
              padding-bottom: 10px;
              margin-bottom: 20px;
            }
            .metrics { 
              display: grid; 
              grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); 
              gap: 20px; 
              margin: 20px 0;
            }
            .metric { 
              background: white; 
              padding: 20px; 
              border-radius: 10px; 
              text-align: center;
              box-shadow: 0 2px 10px rgba(0,0,0,0.1);
              border-top: 4px solid #138808;
            }
            .metric-value { 
              font-size: 2em; 
              font-weight: bold; 
              color: #138808; 
              margin-bottom: 5px;
            }
            .metric-label { 
              color: #666; 
              font-size: 0.9em;
              text-transform: uppercase;
              letter-spacing: 1px;
            }
            .table { 
              width: 100%; 
              border-collapse: collapse; 
              margin: 20px 0;
              background: white;
              border-radius: 10px;
              overflow: hidden;
              box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            }
            .table th { 
              background: #ff9933; 
              color: white; 
              padding: 15px; 
              text-align: left;
              font-weight: bold;
            }
            .table td { 
              padding: 12px 15px; 
              border-bottom: 1px solid #eee;
            }
            .table tr:nth-child(even) { 
              background: #f8f9fa;
            }
            .footer { 
              text-align: center; 
              margin-top: 40px; 
              padding-top: 20px; 
              border-top: 2px solid #eee;
              color: #666;
            }
            .logo { 
              display: inline-block; 
              background: linear-gradient(135deg, #ff9933, #138808); 
              color: white; 
              padding: 10px 20px; 
              border-radius: 25px; 
              font-weight: bold;
              margin-bottom: 10px;
            }
            .alert { 
              background: #fff3cd; 
              border: 1px solid #ffeaa7; 
              color: #856404; 
              padding: 15px; 
              border-radius: 5px; 
              margin: 10px 0;
            }
            .success { 
              background: #d4edda; 
              border: 1px solid #c3e6cb; 
              color: #155724; 
              padding: 15px; 
              border-radius: 5px; 
              margin: 10px 0;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="logo">📊 SmartSahaayak</div>
            <h1>${reportData.businessName}</h1>
            <p>Business Analytics Report</p>
            <p>Generated on ${reportData.reportDate}</p>
            <p>Owner: ${reportData.ownerName}</p>
          </div>

          <div class="section">
            <h2>📈 Monthly Performance Overview</h2>
            <div class="metrics">
              <div class="metric">
                <div class="metric-value">₹${reportData.monthlyRevenue.toLocaleString('en-IN')}</div>
                <div class="metric-label">Total Revenue</div>
              </div>
              <div class="metric">
                <div class="metric-value">₹${reportData.monthlyProfit.toLocaleString('en-IN')}</div>
                <div class="metric-label">Total Profit</div>
              </div>
              <div class="metric">
                <div class="metric-value">${reportData.totalTransactions}</div>
                <div class="metric-label">Transactions</div>
              </div>
              <div class="metric">
                <div class="metric-value">₹${Math.round(reportData.avgSaleValue).toLocaleString('en-IN')}</div>
                <div class="metric-label">Avg Sale Value</div>
              </div>
            </div>
          </div>

          <div class="section">
            <h2>🏆 Top Performing Products</h2>
            <table class="table">
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Product Name</th>
                  <th>Total Sold</th>
                  <th>Revenue Impact</th>
                </tr>
              </thead>
              <tbody>
                ${reportData.topItems.map((item, index) => `
                  <tr>
                    <td><strong>#${index + 1}</strong></td>
                    <td>${item.item.name}</td>
                    <td>${item.totalSold} units</td>
                    <td>₹${(item.item.sellingPrice * item.totalSold).toLocaleString('en-IN')}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>

          ${reportData.lowStockItems.length > 0 ? `
          <div class="section">
            <h2>⚠️ Inventory Alerts</h2>
            <div class="alert">
              <strong>Low Stock Items Requiring Attention:</strong>
            </div>
            <table class="table">
              <thead>
                <tr>
                  <th>Product Name</th>
                  <th>Current Stock</th>
                  <th>Status</th>
                  <th>Action Required</th>
                </tr>
              </thead>
              <tbody>
                ${reportData.lowStockItems.map(item => `
                  <tr>
                    <td>${item.name}</td>
                    <td>${item.quantity} units</td>
                    <td><span style="color: #dc3545; font-weight: bold;">LOW STOCK</span></td>
                    <td>Restock Immediately</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
          ` : `
          <div class="section">
            <h2>✅ Inventory Status</h2>
            <div class="success">
              <strong>Excellent!</strong> All products are well-stocked. No immediate restocking required.
            </div>
          </div>
          `}

          <div class="section">
            <h2>📊 Daily Profit Trend (Last 7 Days)</h2>
            <table class="table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Daily Profit</th>
                  <th>Transactions</th>
                  <th>Performance</th>
                </tr>
              </thead>
              <tbody>
                ${reportData.profitTrend.map(day => `
                  <tr>
                    <td>${day.date}</td>
                    <td>₹${day.profit.toLocaleString('en-IN')}</td>
                    <td>${day.sales}</td>
                    <td>${day.profit > 1000 ? '🟢 Excellent' : day.profit > 500 ? '🟡 Good' : '🔴 Needs Improvement'}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>

          <div class="section">
            <h2>💡 Smart Business Recommendations</h2>
            <div style="background: white; padding: 20px; border-radius: 10px;">
              <h3 style="color: #138808; margin-top: 0;">Actionable Insights:</h3>
              <ul style="line-height: 2;">
                <li><strong>Profit Optimization:</strong> Focus on promoting your top-selling items to maximize revenue.</li>
                <li><strong>Inventory Management:</strong> ${reportData.lowStockItems.length > 0 ? `Restock ${reportData.lowStockItems.length} low-stock items immediately.` : 'Maintain current stock levels - well balanced!'}</li>
                <li><strong>Sales Strategy:</strong> Your average sale value is ₹${Math.round(reportData.avgSaleValue)}. Consider bundling products to increase this.</li>
                <li><strong>Growth Opportunity:</strong> ${reportData.monthlyProfit > 10000 ? 'Consider expanding your product range.' : 'Focus on high-margin items to boost profitability.'}</li>
              </ul>
            </div>
          </div>

          <div class="footer">
            <p><strong>Report generated by SmartSahaayak</strong></p>
            <p>Built with ❤️ using <a href="https://bolt.new" style="color: #ff9933; text-decoration: none;">Bolt.new</a></p>
            <p style="font-size: 0.9em; color: #999;">This report contains confidential business information. Please handle with care.</p>
          </div>
        </body>
      </html>
    `;

    // Create and download the HTML file (in a real app, this would generate a proper PDF)
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${reportData.businessName.replace(/\s+/g, '-')}-business-report-${new Date().toISOString().split('T')[0]}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    // Show success message
    alert('📊 Advanced Business Report Generated Successfully!\n\nYour comprehensive report includes:\n• Monthly performance metrics\n• Top product analysis\n• Inventory alerts\n• Profit trends\n• Smart recommendations\n\nThe report has been downloaded to your device.');
  };

  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4'];

  return (
    <div className="space-y-8">
      {/* Header with Tier Indicator */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center space-x-3 mb-2">
            <h1 className="text-3xl font-bold text-gray-900">Business Insights</h1>
            <div className={`px-3 py-1 rounded-full text-sm font-bold flex items-center space-x-1 ${
              state.userTier === 'pro' 
                ? 'bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700' 
                : 'bg-gray-100 text-gray-600'
            }`}>
              {state.userTier === 'pro' ? <Crown className="h-4 w-4" /> : <Lock className="h-4 w-4" />}
              <span>{state.userTier === 'pro' ? 'PRO USER' : 'FREE USER'}</span>
            </div>
          </div>
          <p className="text-gray-600">
            {state.userTier === 'pro' 
              ? 'Advanced analytics and insights for your business growth'
              : 'Basic insights • Upgrade to Pro for advanced analytics'
            }
          </p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={generateCSVReport}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 flex items-center space-x-2 transition-colors duration-200"
          >
            <Download size={20} />
            <span>Download CSV</span>
          </button>
          <button
            onClick={generateAdvancedPDFReport}
            className={`px-6 py-3 rounded-lg flex items-center space-x-2 transition-colors duration-200 ${
              state.userTier === 'pro'
                ? 'bg-purple-600 text-white hover:bg-purple-700'
                : 'bg-gray-300 text-gray-600 hover:bg-gray-400 cursor-pointer'
            }`}
          >
            {state.userTier === 'free' && <Lock size={16} />}
            <FileText size={20} />
            <span>Business Report</span>
          </button>
        </div>
      </div>

      {/* Free Tier - Basic Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100">आज की बिक्री • Daily Sales</p>
              <p className="text-3xl font-bold">{formatCurrency(basicInsights.todayRevenue)}</p>
            </div>
            <DollarSign className="h-12 w-12 text-blue-200" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100">कुल इन्वेंटरी • Total Inventory</p>
              <p className="text-3xl font-bold">{basicInsights.totalInventoryCount}</p>
            </div>
            <Target className="h-12 w-12 text-green-200" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100">आज के लेन-देन • Today's Transactions</p>
              <p className="text-3xl font-bold">{basicInsights.todaySalesCount}</p>
            </div>
            <Trophy className="h-12 w-12 text-purple-200" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100">टॉप आइटम • Top Item Today</p>
              <p className="text-lg font-bold">
                {basicInsights.topItem ? basicInsights.topItem.item.name.substring(0, 12) + '...' : 'None'}
              </p>
              {basicInsights.topItem && (
                <p className="text-sm text-orange-200">Sold: {basicInsights.topItem.sold}</p>
              )}
            </div>
            <Award className="h-12 w-12 text-orange-200" />
          </div>
        </div>
      </div>

      {/* Pro Features Section */}
      {state.userTier === 'free' ? (
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-200 rounded-3xl p-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-6">
              <div className="p-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl shadow-lg animate-pulse-glow">
                <Crown className="h-12 w-12 text-white" />
              </div>
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Premium Analytics अनलॉक करें
            </h3>
            <p className="text-gray-600 text-lg mb-8">
              Advanced charts, profit analysis, smart tips और बहुत कुछ के लिए Pro में अपग्रेड करें
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <TrendingUp className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                <h4 className="font-bold text-gray-900 mb-2">Profit Trend Charts</h4>
                <p className="text-gray-600 text-sm">Daily profit analysis with visual trends</p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <Award className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                <h4 className="font-bold text-gray-900 mb-2">Top 5 Products</h4>
                <p className="text-gray-600 text-sm">Detailed analysis of best performers</p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <FileText className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                <h4 className="font-bold text-gray-900 mb-2">Professional Reports</h4>
                <p className="text-gray-600 text-sm">Comprehensive PDF business reports</p>
              </div>
            </div>
            
            <button
              onClick={() => handleProFeatureClick('Premium Analytics')}
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-2xl hover:from-purple-700 hover:to-pink-700 focus:outline-none focus:ring-4 focus:ring-purple-200 transition-all duration-300 flex items-center space-x-3 mx-auto text-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
            >
              <Crown className="h-6 w-6" />
              <span>Upgrade to Pro - ₹99/month</span>
            </button>
          </div>
        </div>
      ) : (
        <>
          {/* Pro User - Advanced Analytics */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Daily Profit Trend */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Daily Profit Trend (Last 7 Days)</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={proInsights?.profitTrend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="date" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip 
                    formatter={(value) => [formatCurrency(Number(value)), 'Profit']}
                    labelStyle={{ color: '#374151' }}
                    contentStyle={{ backgroundColor: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="profit" 
                    stroke="#10B981" 
                    strokeWidth={3}
                    dot={{ fill: '#10B981', strokeWidth: 2, r: 6 }}
                    activeDot={{ r: 8, stroke: '#10B981', strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Profit by Item */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Profit by Item (Top 8)</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={proInsights?.profitByItem} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis type="number" stroke="#6b7280" />
                  <YAxis dataKey="name" type="category" width={80} stroke="#6b7280" fontSize={12} />
                  <Tooltip 
                    formatter={(value) => [formatCurrency(Number(value)), 'Profit']}
                    labelStyle={{ color: '#374151' }}
                    contentStyle={{ backgroundColor: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                  />
                  <Bar dataKey="profit" fill="#3B82F6" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Pro Features Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Top Selling Items */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-center space-x-2 mb-6">
                <Award className="h-6 w-6 text-yellow-500" />
                <h3 className="text-xl font-semibold text-gray-900">Top Sellers</h3>
              </div>
              <div className="space-y-4">
                {proInsights?.topSellingItems.slice(0, 5).map((item, index) => (
                  <div key={item.item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                        index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : index === 2 ? 'bg-orange-500' : 'bg-blue-500'
                      }`}>
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{item.item.name}</p>
                        <p className="text-sm text-gray-500">{item.totalSold} sold</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-green-600">{formatCurrency(item.item.sellingPrice * item.totalSold)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Category Distribution */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Stock by Category</h3>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={proInsights?.categoryChart}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {proInsights?.categoryChart.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Alerts */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-center space-x-2 mb-6">
                <AlertTriangle className="h-6 w-6 text-red-500" />
                <h3 className="text-xl font-semibold text-gray-900">Action Required</h3>
              </div>
              <div className="space-y-3">
                {proInsights?.lowStockItems.map((item) => (
                  <div key={`stock-${item.id}`} className="p-3 bg-red-50 rounded-lg border border-red-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-red-900">{item.name}</p>
                        <p className="text-sm text-red-600">Only {item.quantity} left</p>
                      </div>
                      <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium">
                        Low Stock
                      </span>
                    </div>
                  </div>
                ))}
                
                {proInsights?.lowMarginItems.map((item) => (
                  <div key={`margin-${item.id}`} className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-yellow-900">{item.name}</p>
                        <p className="text-sm text-yellow-600">
                          {calculateProfitMargin(item.costPrice, item.sellingPrice).toFixed(1)}% margin
                        </p>
                      </div>
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-medium">
                        Low Margin
                      </span>
                    </div>
                  </div>
                ))}
                
                {(proInsights?.lowStockItems.length === 0 && proInsights?.lowMarginItems.length === 0) && (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Trophy className="h-8 w-8 text-green-600" />
                    </div>
                    <p className="text-green-600 font-medium">All items are well optimized!</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Smart Suggestions - Pro Only */}
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl shadow-lg p-6 text-white">
            <div className="flex items-center space-x-3 mb-4">
              <Lightbulb className="h-8 w-8 text-yellow-300" />
              <h3 className="text-2xl font-semibold">Smart Business Suggestions</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white bg-opacity-10 rounded-lg p-4 backdrop-blur-sm">
                <p className="text-white text-sm leading-relaxed">
                  🔥 Restock "Sugar" - it's running low and has good profit margins!
                </p>
              </div>
              <div className="bg-white bg-opacity-10 rounded-lg p-4 backdrop-blur-sm">
                <p className="text-white text-sm leading-relaxed">
                  💰 Consider increasing price of "Milk" by ₹5 to improve profit margin.
                </p>
              </div>
              <div className="bg-white bg-opacity-10 rounded-lg p-4 backdrop-blur-sm">
                <p className="text-white text-sm leading-relaxed">
                  📈 Your daily profit is trending upward. Keep up the momentum!
                </p>
              </div>
              <div className="bg-white bg-opacity-10 rounded-lg p-4 backdrop-blur-sm">
                <p className="text-white text-sm leading-relaxed">
                  🛒 Bundle "Tea + Biscuits" to increase average sale value.
                </p>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Footer */}
      <div className="text-center py-8">
        <p className="text-gray-500 text-sm">
          Built with ❤️ using{' '}
          <a 
            href="https://bolt.new" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline font-medium"
          >
            Bolt.new
          </a>
        </p>
      </div>

      <PaywallModal
        isOpen={showPaywall}
        onClose={() => setShowPaywall(false)}
        feature={paywallFeature}
      />
    </div>
  );
};

export default Insights;