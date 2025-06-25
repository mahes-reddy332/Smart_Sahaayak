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
import { Loader } from 'lucide-react';

function AppContent() {
  const { state: authState } = useAuth();

  if (authState.isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader className="h-12 w-12 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading your business dashboard...</p>
        </div>
      </div>
    );
  }

  if (!authState.isAuthenticated) {
    return <AuthPage />;
  }

  return (
    <AppProvider>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
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