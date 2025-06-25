import React, { useState, useEffect } from 'react';
import { Package, ShoppingCart, TrendingUp, AlertTriangle, Store, Users, Calendar, Target, Zap, Award, Clock, Star, Gift, Sparkles, ArrowRight, Eye, BarChart3, DollarSign, Bell } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../Auth/AuthContext';
import { useNavigate } from 'react-router-dom';
import { getTodaysSales, getTotalRevenue, getTotalProfit, getLowStockItems, formatCurrency } from '../../utils/calculations';
import SummaryCard from './SummaryCard';

const Dashboard: React.FC = () => {
  const { state } = useApp();
  const { state: authState } = useAuth();
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [greeting, setGreeting] = useState('');
  const [showWelcomeAnimation, setShowWelcomeAnimation] = useState(true);
  
  const todaysSales = getTodaysSales(state.sales);
  const totalRevenue = getTotalRevenue(state.sales);
  const totalProfit = getTotalProfit(state.sales);
  const lowStockItems = getLowStockItems(state.inventory);
  const totalItems = state.inventory.length;

  // Calculate additional metrics
  const todaysRevenue = getTotalRevenue(todaysSales);
  const todaysProfit = getTotalProfit(todaysSales);
  const avgSaleValue = todaysSales.length > 0 ? todaysRevenue / todaysSales.length : 0;
  const completedReminders = state.reminders.filter(r => r.isCompleted).length;

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Set greeting based on time
  useEffect(() => {
    const hour = currentTime.getHours();
    if (hour < 12) setGreeting('शुभ प्रभात'); // Good Morning
    else if (hour < 17) setGreeting('नमस्ते'); // Good Afternoon
    else setGreeting('शुभ संध्या'); // Good Evening
  }, [currentTime]);

  // Hide welcome animation after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWelcomeAnimation(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  // Calculate business status
  const getBusinessStatus = () => {
    if (todaysSales.length === 0) return { 
      status: 'शुरुआत करें', 
      statusEn: 'Getting Started',
      color: 'text-blue-600', 
      bg: 'bg-blue-100',
      icon: Zap
    };
    if (todaysSales.length < 5) return { 
      status: 'बढ़ रहे हैं', 
      statusEn: 'Growing',
      color: 'text-yellow-600', 
      bg: 'bg-yellow-100',
      icon: TrendingUp
    };
    if (todaysSales.length < 10) return { 
      status: 'तेज़ी से बढ़ रहे', 
      statusEn: 'Accelerating',
      color: 'text-green-600', 
      bg: 'bg-green-100',
      icon: Star
    };
    return { 
      status: 'सफल व्यापार', 
      statusEn: 'Thriving Business',
      color: 'text-purple-600', 
      bg: 'bg-purple-100',
      icon: Award
    };
  };

  const businessStatus = getBusinessStatus();

  // Navigation handlers
  const handleNavigateToSales = () => navigate('/sales');
  const handleNavigateToInventory = () => navigate('/inventory');
  const handleNavigateToInsights = () => navigate('/insights');
  const handleNavigateToReminders = () => navigate('/reminders');
  
  return (
    <div className="space-y-6 sm:space-y-8 container-mobile">
      {/* Enhanced Hero Section with Indian Design - Responsive */}
      <div className="relative overflow-hidden bg-gradient-to-br from-saffron via-orange-500 to-green-india rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl">
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        
        {/* Indian Pattern Background - Responsive */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-48 h-48 sm:w-96 sm:h-96 bg-white rounded-full -translate-y-24 sm:-translate-y-48 translate-x-24 sm:translate-x-48 animate-pulse"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 sm:w-64 sm:h-64 bg-white rounded-full translate-y-16 sm:translate-y-32 -translate-x-16 sm:-translate-x-32 animate-bounce-gentle"></div>
          <div className="absolute top-1/2 left-1/4 w-16 h-16 sm:w-32 sm:h-32 bg-yellow-300 rounded-full animate-ping"></div>
          
          {/* Decorative Elements - Responsive */}
          <div className="absolute top-4 sm:top-8 right-4 sm:right-8 w-4 h-4 sm:w-8 sm:h-8 border-2 border-white rounded-full animate-spin"></div>
          <div className="absolute bottom-4 sm:bottom-8 left-4 sm:left-8 w-3 h-3 sm:w-6 sm:h-6 bg-white rounded-full animate-pulse"></div>
        </div>
        
        <div className="relative px-4 sm:px-6 md:px-8 py-8 sm:py-12 text-white">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <div className="flex-1 mb-6 sm:mb-8 lg:mb-0">
              {/* Welcome Animation */}
              {showWelcomeAnimation && (
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-saffron to-green-india z-10 rounded-2xl sm:rounded-3xl">
                  <div className="text-center text-white animate-fade-in-up">
                    <Sparkles className="h-12 w-12 sm:h-16 sm:w-16 mx-auto mb-3 sm:mb-4 animate-bounce-gentle" />
                    <h2 className="text-2xl sm:text-4xl font-bold mb-2">स्वागत है!</h2>
                    <p className="text-lg sm:text-xl">Welcome to SmartSahaayak</p>
                  </div>
                </div>
              )}
              
              <div className="flex items-center space-x-3 sm:space-x-4 mb-4 sm:mb-6">
                <div className="p-2 sm:p-4 bg-white bg-opacity-20 rounded-xl sm:rounded-2xl backdrop-blur-sm animate-pulse-glow">
                  <Store className="h-6 w-6 sm:h-10 sm:w-10 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold mb-1 sm:mb-2 heading-responsive">
                    {greeting}! 🙏
                  </h1>
                  <p className="text-lg sm:text-xl md:text-2xl text-orange-100 font-medium">
                    {authState.user?.businessName || 'Your Business'}
                  </p>
                </div>
              </div>
              
              <p className="text-base sm:text-lg md:text-xl text-orange-100 max-w-2xl leading-relaxed mb-6 sm:mb-8 text-responsive">
                आपके व्यापार की सफलता के लिए डिजिटल समाधान। 
                <br className="hidden md:block" />
                <span className="text-white font-semibold">Smart tools for smart business growth!</span>
              </p>
              
              {/* Enhanced Status Cards - Responsive */}
              <div className="flex flex-wrap gap-2 sm:gap-4">
                <div className="flex items-center space-x-2 sm:space-x-3 bg-white bg-opacity-15 px-2 sm:px-4 py-2 sm:py-3 rounded-xl sm:rounded-2xl backdrop-blur-sm hover:bg-opacity-25 transition-all duration-300">
                  <Clock className="h-4 w-4 sm:h-6 sm:w-6 text-yellow-300" />
                  <div>
                    <span className="text-xs sm:text-sm font-medium block">
                      {currentTime.toLocaleTimeString('hi-IN', { 
                        hour: '2-digit', 
                        minute: '2-digit'
                      })}
                    </span>
                    <span className="text-xs text-orange-200">Live Time</span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 sm:space-x-3 bg-white bg-opacity-15 px-2 sm:px-4 py-2 sm:py-3 rounded-xl sm:rounded-2xl backdrop-blur-sm hover:bg-opacity-25 transition-all duration-300">
                  <Calendar className="h-4 w-4 sm:h-6 sm:w-6 text-blue-300" />
                  <div>
                    <span className="text-xs sm:text-sm font-medium block">
                      {currentTime.toLocaleDateString('hi-IN', { 
                        weekday: 'short', 
                        day: 'numeric',
                        month: 'short'
                      })}
                    </span>
                    <span className="text-xs text-orange-200">Today</span>
                  </div>
                </div>
                
                <div className={`flex items-center space-x-2 sm:space-x-3 ${businessStatus.bg} ${businessStatus.color} px-2 sm:px-4 py-2 sm:py-3 rounded-xl sm:rounded-2xl hover:scale-105 transition-all duration-300`}>
                  <businessStatus.icon className="h-4 w-4 sm:h-6 sm:w-6" />
                  <div>
                    <span className="text-xs sm:text-sm font-bold block">{businessStatus.status}</span>
                    <span className="text-xs opacity-75">{businessStatus.statusEn}</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Enhanced Hero Image - Responsive */}
            <div className="flex-shrink-0 w-full lg:w-auto">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-saffron to-green-india rounded-2xl sm:rounded-3xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-500"></div>
                <img 
                  src="https://images.pexels.com/photos/264636/pexels-photo-264636.jpeg?auto=compress&cs=tinysrgb&w=500" 
                  alt="Modern Indian Shop"
                  className="relative w-full h-48 sm:h-64 lg:w-80 lg:h-64 object-cover rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl transform group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent rounded-2xl sm:rounded-3xl"></div>
                <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 text-white">
                  <p className="text-base sm:text-lg font-bold">आपकी डिजिटल दुकान</p>
                  <p className="text-sm opacity-90">Your Digital Store</p>
                </div>
                {/* Floating badges - Responsive */}
                <div className="absolute -top-2 sm:-top-3 -right-2 sm:-right-3 bg-green-500 text-white px-2 sm:px-3 py-1 rounded-full text-xs font-bold animate-bounce-gentle flex items-center space-x-1">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full animate-pulse"></div>
                  <span>LIVE</span>
                </div>
                <div className="absolute top-2 sm:top-4 -left-2 sm:-left-3 bg-yellow-500 text-yellow-900 px-2 sm:px-3 py-1 rounded-full text-xs font-bold animate-pulse">
                  <Gift className="h-2 w-2 sm:h-3 sm:w-3 inline mr-1" />
                  NEW
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Summary Cards with Navigation - Responsive */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          <div 
            onClick={handleNavigateToInventory}
            className="cursor-pointer transform hover:scale-105 transition-all duration-300"
          >
            <SummaryCard
              title="कुल आइटम / Total Items"
              value={totalItems}
              icon={Package}
              color="blue"
              trend={{ value: 12, isPositive: true }}
              description="स्टॉक में आइटम"
              onClick={handleNavigateToInventory}
            />
          </div>
        </div>
        <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <div 
            onClick={handleNavigateToSales}
            className="cursor-pointer transform hover:scale-105 transition-all duration-300"
          >
            <SummaryCard
              title="आज की बिक्री / Today's Sales"
              value={todaysSales.length}
              icon={ShoppingCart}
              color="green"
              trend={{ value: 8, isPositive: true }}
              description="आज के लेन-देन"
              onClick={handleNavigateToSales}
            />
          </div>
        </div>
        <div className="animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
          <div 
            onClick={handleNavigateToInsights}
            className="cursor-pointer transform hover:scale-105 transition-all duration-300"
          >
            <SummaryCard
              title="कुल आय / Total Revenue"
              value={formatCurrency(totalRevenue)}
              icon={TrendingUp}
              color="purple"
              trend={{ value: 15, isPositive: true }}
              description="सभी समय की कमाई"
              onClick={handleNavigateToInsights}
            />
          </div>
        </div>
        <div className="animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <div 
            onClick={handleNavigateToInventory}
            className="cursor-pointer transform hover:scale-105 transition-all duration-300"
          >
            <SummaryCard
              title="स्टॉक अलर्ट / Stock Alerts"
              value={lowStockItems.length}
              icon={AlertTriangle}
              color="red"
              description="रीस्टॉक की जरूरत"
              onClick={handleNavigateToInventory}
            />
          </div>
        </div>
      </div>

      {/* Enhanced Today's Performance Cards - Responsive */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl sm:rounded-2xl p-4 sm:p-6 text-white shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 cursor-pointer" onClick={handleNavigateToSales}>
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <div className="p-2 sm:p-3 bg-white bg-opacity-20 rounded-lg sm:rounded-xl">
              <DollarSign className="h-6 w-6 sm:h-8 sm:w-8" />
            </div>
            <ArrowRight className="h-4 w-4 sm:h-6 sm:w-6 opacity-70 hover:opacity-100 transition-opacity" />
          </div>
          <h3 className="text-base sm:text-lg font-semibold mb-2">आज की आय • Today's Revenue</h3>
          <p className="text-2xl sm:text-3xl font-bold mb-1">{formatCurrency(todaysRevenue)}</p>
          <p className="text-blue-100 text-xs sm:text-sm">
            {todaysSales.length} transactions completed
          </p>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl sm:rounded-2xl p-4 sm:p-6 text-white shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 cursor-pointer" onClick={handleNavigateToInsights}>
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <div className="p-2 sm:p-3 bg-white bg-opacity-20 rounded-lg sm:rounded-xl">
              <Target className="h-6 w-6 sm:h-8 sm:w-8" />
            </div>
            <ArrowRight className="h-4 w-4 sm:h-6 sm:w-6 opacity-70 hover:opacity-100 transition-opacity" />
          </div>
          <h3 className="text-base sm:text-lg font-semibold mb-2">आज का लाभ • Today's Profit</h3>
          <p className="text-2xl sm:text-3xl font-bold mb-1">{formatCurrency(todaysProfit)}</p>
          <p className="text-green-100 text-xs sm:text-sm">
            {((todaysProfit / (todaysRevenue || 1)) * 100).toFixed(1)}% profit margin
          </p>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl sm:rounded-2xl p-4 sm:p-6 text-white shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 cursor-pointer" onClick={handleNavigateToSales}>
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <div className="p-2 sm:p-3 bg-white bg-opacity-20 rounded-lg sm:rounded-xl">
              <BarChart3 className="h-6 w-6 sm:h-8 sm:w-8" />
            </div>
            <ArrowRight className="h-4 w-4 sm:h-6 sm:w-6 opacity-70 hover:opacity-100 transition-opacity" />
          </div>
          <h3 className="text-base sm:text-lg font-semibold mb-2">औसत बिक्री • Avg Sale</h3>
          <p className="text-2xl sm:text-3xl font-bold mb-1">{formatCurrency(avgSaleValue)}</p>
          <p className="text-purple-100 text-xs sm:text-sm">
            Per transaction value
          </p>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl sm:rounded-2xl p-4 sm:p-6 text-white shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 cursor-pointer" onClick={handleNavigateToReminders}>
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <div className="p-2 sm:p-3 bg-white bg-opacity-20 rounded-lg sm:rounded-xl">
              <Bell className="h-6 w-6 sm:h-8 sm:w-8" />
            </div>
            <ArrowRight className="h-4 w-4 sm:h-6 sm:w-6 opacity-70 hover:opacity-100 transition-opacity" />
          </div>
          <h3 className="text-base sm:text-lg font-semibold mb-2">पूर्ण कार्य • Completed Tasks</h3>
          <p className="text-2xl sm:text-3xl font-bold mb-1">{completedReminders}</p>
          <p className="text-orange-100 text-xs sm:text-sm">
            Out of {state.reminders.length} total reminders
          </p>
        </div>
      </div>

      {/* Enhanced Content Grid with Indian Business Theme - Responsive */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
        {/* Recent Sales with Indian Design */}
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-500 group card-hover">
          <div className="relative h-32 sm:h-40 bg-gradient-to-r from-green-india via-emerald-500 to-teal-500 overflow-hidden">
            <div className="absolute inset-0 bg-black bg-opacity-20"></div>
            <img 
              src="https://images.pexels.com/photos/3962285/pexels-photo-3962285.jpeg?auto=compress&cs=tinysrgb&w=500" 
              alt="Sales Analytics"
              className="w-full h-full object-cover mix-blend-overlay group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 text-white">
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <Award className="h-4 w-4 sm:h-6 sm:w-6 animate-bounce-gentle" />
                  <div>
                    <h3 className="text-lg sm:text-2xl font-bold">हाल की बिक्री</h3>
                    <p className="text-xs sm:text-sm opacity-90">Recent Sales</p>
                  </div>
                </div>
                <button 
                  onClick={handleNavigateToSales}
                  className="bg-white bg-opacity-20 backdrop-blur-sm px-2 sm:px-4 py-1 sm:py-2 rounded-lg sm:rounded-xl hover:bg-opacity-30 transition-all duration-200 flex items-center space-x-1 sm:space-x-2"
                >
                  <Eye className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span className="text-xs sm:text-sm font-medium">View All</span>
                </button>
              </div>
            </div>
          </div>
          
          <div className="p-4 sm:p-6">
            <div className="space-y-3 sm:space-y-4">
              {state.sales.slice(0, 5).map((sale, index) => (
                <div key={sale.id} className="flex items-center justify-between p-3 sm:p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl sm:rounded-2xl hover:from-green-100 hover:to-emerald-100 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg border border-green-100">
                  <div className="flex items-center space-x-3 sm:space-x-4">
                    <div className="relative">
                      <div className="w-8 h-8 sm:w-12 sm:h-12 bg-gradient-to-br from-green-india to-emerald-600 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg">
                        <span className="text-white font-bold text-xs sm:text-base">#{index + 1}</span>
                      </div>
                      <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 sm:w-4 sm:h-4 bg-yellow-400 rounded-full border-2 border-white"></div>
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 text-sm sm:text-lg">{sale.itemName}</p>
                      <p className="text-xs sm:text-sm text-gray-600">मात्रा: {sale.quantitySold} | Qty: {sale.quantitySold}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-green-600 text-base sm:text-xl">{formatCurrency(sale.totalAmount)}</p>
                    <p className="text-xs text-gray-500">
                      {new Date(sale.createdAt).toLocaleDateString('hi-IN')}
                    </p>
                  </div>
                </div>
              ))}
              
              {state.sales.length === 0 && (
                <div className="text-center py-8 sm:py-12">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl sm:rounded-3xl flex items-center justify-center mx-auto mb-3 sm:mb-4 animate-pulse">
                    <ShoppingCart className="h-8 w-8 sm:h-10 sm:w-10 text-gray-400" />
                  </div>
                  <p className="text-gray-600 font-semibold text-base sm:text-lg">अभी तक कोई बिक्री नहीं</p>
                  <p className="text-sm text-gray-500 mt-1">No sales recorded yet</p>
                  <p className="text-xs text-gray-400 mt-2">बेचना शुरू करें • Start selling to see transactions</p>
                  <button 
                    onClick={handleNavigateToSales}
                    className="mt-3 sm:mt-4 bg-green-600 text-white px-4 sm:px-6 py-2 rounded-lg sm:rounded-xl hover:bg-green-700 transition-colors duration-200 text-sm sm:text-base"
                  >
                    Record First Sale
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Low Stock Alerts with Indian Design */}
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-500 group card-hover">
          <div className="relative h-32 sm:h-40 bg-gradient-to-r from-red-500 via-pink-500 to-rose-500 overflow-hidden">
            <div className="absolute inset-0 bg-black bg-opacity-20"></div>
            <img 
              src="https://images.pexels.com/photos/4386321/pexels-photo-4386321.jpeg?auto=compress&cs=tinysrgb&w=500" 
              alt="Inventory Management"
              className="w-full h-full object-cover mix-blend-overlay group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 text-white">
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <AlertTriangle className="h-4 w-4 sm:h-6 sm:w-6 animate-pulse" />
                  <div>
                    <h3 className="text-lg sm:text-2xl font-bold">स्टॉक अलर्ट</h3>
                    <p className="text-xs sm:text-sm opacity-90">Stock Alerts</p>
                  </div>
                </div>
                <button 
                  onClick={handleNavigateToInventory}
                  className="bg-white bg-opacity-20 backdrop-blur-sm px-2 sm:px-4 py-1 sm:py-2 rounded-lg sm:rounded-xl hover:bg-opacity-30 transition-all duration-200 flex items-center space-x-1 sm:space-x-2"
                >
                  <Eye className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span className="text-xs sm:text-sm font-medium">Manage</span>
                </button>
              </div>
            </div>
            {/* Alert indicators */}
            {lowStockItems.length > 0 && (
              <div className="absolute top-3 sm:top-4 right-3 sm:right-4 bg-red-500 text-white px-2 sm:px-3 py-1 rounded-full text-xs font-bold animate-bounce-gentle flex items-center space-x-1">
                <AlertTriangle className="h-3 w-3 sm:h-4 sm:w-4" />
                <span>{lowStockItems.length}</span>
              </div>
            )}
          </div>
          
          <div className="p-4 sm:p-6">
            <div className="space-y-3 sm:space-y-4">
              {lowStockItems.length > 0 ? (
                lowStockItems.map((item, index) => (
                  <div key={item.id} className="flex items-center justify-between p-3 sm:p-4 bg-gradient-to-r from-red-50 to-orange-50 rounded-xl sm:rounded-2xl border border-red-200 hover:from-red-100 hover:to-orange-100 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg">
                    <div className="flex items-center space-x-3 sm:space-x-4">
                      <div className="relative">
                        <div className="w-8 h-8 sm:w-12 sm:h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg">
                          <AlertTriangle className="h-4 w-4 sm:h-6 sm:w-6 text-white animate-pulse" />
                        </div>
                        <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 sm:w-4 sm:h-4 bg-yellow-400 rounded-full border-2 border-white animate-ping"></div>
                      </div>
                      <div>
                        <p className="font-bold text-gray-900 text-sm sm:text-lg">{item.name}</p>
                        <p className="text-xs sm:text-sm text-red-600 font-semibold">केवल {item.quantity} बचे • Only {item.quantity} left</p>
                      </div>
                    </div>
                    <div className="px-2 sm:px-4 py-1 sm:py-2 bg-gradient-to-r from-red-100 to-red-200 text-red-700 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-bold animate-pulse">
                      रीस्टॉक करें
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 sm:py-12">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-green-100 to-green-200 rounded-2xl sm:rounded-3xl flex items-center justify-center mx-auto mb-3 sm:mb-4 animate-pulse">
                    <Package className="h-8 w-8 sm:h-10 sm:w-10 text-green-600" />
                  </div>
                  <p className="text-green-600 font-bold text-base sm:text-lg">सभी आइटम स्टॉक में! 🎉</p>
                  <p className="text-sm text-gray-500 mt-1">All items well stocked!</p>
                  <p className="text-xs text-gray-400 mt-2">आपका इन्वेंटरी लेवल बेहतरीन है</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Business Metrics with Navigation - Responsive */}
      <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl border border-gray-100 overflow-hidden group hover:shadow-2xl transition-all duration-500">
        <div className="relative h-32 sm:h-48 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 overflow-hidden">
          <div className="absolute inset-0 bg-black bg-opacity-30"></div>
          <img 
            src="https://images.pexels.com/photos/590022/pexels-photo-590022.jpg?auto=compress&cs=tinysrgb&w=800" 
            alt="Business Growth"
            className="w-full h-full object-cover mix-blend-overlay group-hover:scale-110 transition-transform duration-1000"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white">
              <div className="flex items-center justify-center space-x-2 sm:space-x-3 mb-3 sm:mb-4">
                <TrendingUp className="h-6 w-6 sm:h-10 sm:w-10 animate-bounce-gentle" />
                <div>
                  <h3 className="text-xl sm:text-3xl font-bold">व्यापार प्रदर्शन</h3>
                  <p className="text-sm sm:text-lg opacity-90">Business Performance</p>
                </div>
              </div>
              <p className="text-sm sm:text-lg opacity-90">आपकी सफलता के मेट्रिक्स • Your success metrics</p>
              <button 
                onClick={handleNavigateToInsights}
                className="mt-3 sm:mt-4 bg-white bg-opacity-20 backdrop-blur-sm px-3 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl hover:bg-opacity-30 transition-all duration-200 flex items-center space-x-1 sm:space-x-2 mx-auto text-sm sm:text-base"
              >
                <BarChart3 className="h-4 w-4 sm:h-5 sm:w-5" />
                <span className="font-medium">View Detailed Analytics</span>
                <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4" />
              </button>
            </div>
          </div>
        </div>
        
        <div className="p-4 sm:p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-8">
            <div className="text-center group/metric cursor-pointer" onClick={handleNavigateToInsights}>
              <div className="w-16 h-16 sm:w-24 sm:h-24 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl sm:rounded-3xl flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover/metric:scale-110 group-hover/metric:rotate-3 transition-all duration-500 shadow-xl group-hover/metric:shadow-blue-200">
                <TrendingUp className="h-8 w-8 sm:h-12 sm:w-12 text-white" />
              </div>
              <div className="text-2xl sm:text-4xl font-bold text-blue-600 mb-2 sm:mb-3 group-hover/metric:scale-110 transition-transform duration-300">{formatCurrency(totalRevenue)}</div>
              <div className="text-base sm:text-lg text-gray-700 font-semibold mb-1">कुल आय • Total Revenue</div>
              <div className="text-xs sm:text-sm text-gray-500">सभी समय की कमाई</div>
            </div>
            
            <div className="text-center group/metric cursor-pointer" onClick={handleNavigateToInsights}>
              <div className="w-16 h-16 sm:w-24 sm:h-24 bg-gradient-to-br from-green-india to-green-600 rounded-2xl sm:rounded-3xl flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover/metric:scale-110 group-hover/metric:rotate-3 transition-all duration-500 shadow-xl group-hover/metric:shadow-green-200">
                <Target className="h-8 w-8 sm:h-12 sm:w-12 text-white" />
              </div>
              <div className="text-2xl sm:text-4xl font-bold text-green-600 mb-2 sm:mb-3 group-hover/metric:scale-110 transition-transform duration-300">{formatCurrency(totalProfit)}</div>
              <div className="text-base sm:text-lg text-gray-700 font-semibold mb-1">कुल लाभ • Total Profit</div>
              <div className="text-xs sm:text-sm text-gray-500">शुद्ध कमाई</div>
            </div>
            
            <div className="text-center group/metric cursor-pointer" onClick={handleNavigateToSales}>
              <div className="w-16 h-16 sm:w-24 sm:h-24 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl sm:rounded-3xl flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover/metric:scale-110 group-hover/metric:rotate-3 transition-all duration-500 shadow-xl group-hover/metric:shadow-purple-200">
                <Users className="h-8 w-8 sm:h-12 sm:w-12 text-white" />
              </div>
              <div className="text-2xl sm:text-4xl font-bold text-purple-600 mb-2 sm:mb-3 group-hover/metric:scale-110 transition-transform duration-300">{state.sales.length}</div>
              <div className="text-base sm:text-lg text-gray-700 font-semibold mb-1">कुल लेन-देन • Transactions</div>
              <div className="text-xs sm:text-sm text-gray-500">पूर्ण बिक्री</div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Quick Actions with Navigation - Responsive */}
      <div className="bg-gradient-to-r from-orange-50 via-yellow-50 to-green-50 rounded-2xl sm:rounded-3xl p-4 sm:p-8 border-2 border-orange-100 shadow-lg">
        <div className="text-center mb-6 sm:mb-8">
          <div className="flex items-center justify-center space-x-2 sm:space-x-3 mb-3 sm:mb-4">
            <Zap className="h-6 w-6 sm:h-8 sm:w-8 text-saffron animate-bounce-gentle" />
            <h3 className="text-xl sm:text-3xl font-bold text-gray-900">त्वरित कार्य • Quick Actions</h3>
          </div>
          <p className="text-gray-600 text-base sm:text-lg">काम तेज़ी से पूरा करें • Get things done faster</p>
        </div>
        <div className="flex flex-wrap justify-center gap-3 sm:gap-6">
          <button 
            onClick={handleNavigateToInventory}
            className="group flex items-center space-x-2 sm:space-x-4 bg-white px-4 sm:px-8 py-3 sm:py-6 rounded-xl sm:rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 transform border-2 border-blue-100 hover:border-blue-300 card-hover"
          >
            <div className="p-2 sm:p-3 bg-blue-100 rounded-xl sm:rounded-2xl group-hover:bg-blue-200 transition-colors duration-200">
              <Package className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600" />
            </div>
            <div className="text-left">
              <span className="block font-bold text-gray-700 group-hover:text-blue-600 transition-colors duration-200 text-sm sm:text-lg">इन्वेंटरी जोड़ें</span>
              <span className="block text-xs sm:text-sm text-gray-500">Add Inventory</span>
            </div>
          </button>
          
          <button 
            onClick={handleNavigateToSales}
            className="group flex items-center space-x-2 sm:space-x-4 bg-white px-4 sm:px-8 py-3 sm:py-6 rounded-xl sm:rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 transform border-2 border-green-100 hover:border-green-300 card-hover"
          >
            <div className="p-2 sm:p-3 bg-green-100 rounded-xl sm:rounded-2xl group-hover:bg-green-200 transition-colors duration-200">
              <ShoppingCart className="h-6 w-6 sm:h-8 sm:w-8 text-green-600" />
            </div>
            <div className="text-left">
              <span className="block font-bold text-gray-700 group-hover:text-green-600 transition-colors duration-200 text-sm sm:text-lg">बिक्री रिकॉर्ड करें</span>
              <span className="block text-xs sm:text-sm text-gray-500">Record Sale</span>
            </div>
          </button>
          
          <button 
            onClick={() => navigate('/contacts')}
            className="group flex items-center space-x-2 sm:space-x-4 bg-white px-4 sm:px-8 py-3 sm:py-6 rounded-xl sm:rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 transform border-2 border-purple-100 hover:border-purple-300 card-hover"
          >
            <div className="p-2 sm:p-3 bg-purple-100 rounded-xl sm:rounded-2xl group-hover:bg-purple-200 transition-colors duration-200">
              <Users className="h-6 w-6 sm:h-8 sm:w-8 text-purple-600" />
            </div>
            <div className="text-left">
              <span className="block font-bold text-gray-700 group-hover:text-purple-600 transition-colors duration-200 text-sm sm:text-lg">संपर्क जोड़ें</span>
              <span className="block text-xs sm:text-sm text-gray-500">Add Contact</span>
            </div>
          </button>
        </div>
      </div>

      {/* Support Section - Responsive */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl sm:rounded-3xl p-6 sm:p-8 text-white text-center">
        <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">सहायता चाहिए? • Need Help?</h3>
        <p className="text-blue-100 mb-4 sm:mb-6 text-sm sm:text-base">हमारी टीम आपकी मदद के लिए तैयार है • Our team is ready to help you</p>
        <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
          <a href="mailto:support@smartsahaayak.com" className="bg-white text-blue-600 px-4 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl font-semibold hover:bg-blue-50 transition-colors duration-200 text-sm sm:text-base">
            📧 Email Support
          </a>
          <a href="https://wa.me/919876543210" className="bg-green-500 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl font-semibold hover:bg-green-600 transition-colors duration-200 text-sm sm:text-base">
            📱 WhatsApp Help
          </a>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;