import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider, useAuth } from './components/Auth/AuthContext';
import { AppProvider } from './context/AppContext';
import AuthPage from './components/Auth/AuthPage';
import Layout from './components/Layout/Layout';
import Dashboard from './components/Dashboard/Dashboard';
import Inventory from './components/Inventory/Inventory';
import Sales from './components/Sales/Sales';
import Bills from './components/Bills/Bills';
import Contacts from './components/Contacts/Contacts';
import Reminders from './components/Reminders/Reminders';
import Insights from './components/Insights/Insights';
import { Loader, AlertCircle } from 'lucide-react';

function AppContent() {
  const { state: authState } = useAuth();

  // Show loading screen with timeout
  if (authState.isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <Loader className="h-12 w-12 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600 text-lg mb-4">Loading your business dashboard...</p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-800">
              If this takes too long, please refresh the page or check your internet connection.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Show error state if there's an authentication error
  if (authState.error && !authState.isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-900 mb-4">Authentication Error</h2>
          <p className="text-gray-600 mb-6">{authState.error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // Show auth page if not authenticated
  if (!authState.isAuthenticated) {
    return <AuthPage />;
  }

  // Show main app if authenticated
  return (
    <AppProvider>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="inventory" element={<Inventory />} />
            <Route path="sales" element={<Sales />} />
            <Route path="bills" element={<Bills />} />
            <Route path="contacts" element={<Contacts />} />
            <Route path="reminders" element={<Reminders />} />
            <Route path="insights" element={<Insights />} />
          </Route>
        </Routes>
      </div>
    </AppProvider>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;