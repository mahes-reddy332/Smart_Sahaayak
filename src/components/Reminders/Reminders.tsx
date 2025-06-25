import React, { useState } from 'react';
import { Bell, Plus, Search, Edit, Trash2, Check, Clock, AlertTriangle } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { formatDate } from '../../utils/calculations';
import ReminderForm from './ReminderForm';
import { Reminder } from '../../types';

const Reminders: React.FC = () => {
  const { state, dispatch } = useApp();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingReminder, setEditingReminder] = useState<Reminder | undefined>();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'completed'>('all');

  const now = new Date();
  const filteredReminders = state.reminders.filter(reminder => {
    const matchesSearch = reminder.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         reminder.recipientName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || 
                          (filterStatus === 'completed' && reminder.isCompleted) ||
                          (filterStatus === 'pending' && !reminder.isCompleted);
    return matchesSearch && matchesStatus;
  });

  const pendingReminders = state.reminders.filter(r => !r.isCompleted);
  const overdueReminders = pendingReminders.filter(r => new Date(r.dueDate) < now);
  const todayReminders = pendingReminders.filter(r => {
    const reminderDate = new Date(r.dueDate);
    return reminderDate.toDateString() === now.toDateString();
  });

  const handleEdit = (reminder: Reminder) => {
    setEditingReminder(reminder);
    setIsFormOpen(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this reminder?')) {
      dispatch({ type: 'DELETE_REMINDER', payload: id });
    }
  };

  const handleToggleComplete = (reminder: Reminder) => {
    dispatch({ 
      type: 'UPDATE_REMINDER', 
      payload: { ...reminder, isCompleted: !reminder.isCompleted } 
    });
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
    setEditingReminder(undefined);
  };

  const getReminderStatus = (reminder: Reminder) => {
    if (reminder.isCompleted) return 'completed';
    if (new Date(reminder.dueDate) < now) return 'overdue';
    if (new Date(reminder.dueDate).toDateString() === now.toDateString()) return 'today';
    return 'upcoming';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-100';
      case 'overdue': return 'text-red-600 bg-red-100';
      case 'today': return 'text-orange-600 bg-orange-100';
      default: return 'text-blue-600 bg-blue-100';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reminders</h1>
          <p className="text-gray-600">Stay on top of important tasks and follow-ups</p>
        </div>
        <button
          onClick={() => setIsFormOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2 transition-colors duration-200"
        >
          <Plus size={20} />
          <span>Add Reminder</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Bell className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Reminders</p>
              <p className="text-2xl font-bold text-gray-900">{state.reminders.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-orange-100 rounded-lg">
              <Clock className="h-6 w-6 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Due Today</p>
              <p className="text-2xl font-bold text-gray-900">{todayReminders.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-red-100 rounded-lg">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Overdue</p>
              <p className="text-2xl font-bold text-gray-900">{overdueReminders.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-green-100 rounded-lg">
              <Check className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Completed</p>
              <p className="text-2xl font-bold text-gray-900">
                {state.reminders.filter(r => r.isCompleted).length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search reminders..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex space-x-2">
          {(['all', 'pending', 'completed'] as const).map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
                filterStatus === status
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-600 hover:text-gray-900 border border-gray-300'
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Reminders List */}
      <div className="bg-white rounded-xl shadow-md border border-gray-100">
        <div className="p-6 border-b">
          <h3 className="text-lg font-semibold text-gray-900">
            {filterStatus === 'all' ? 'All Reminders' : `${filterStatus.charAt(0).toUpperCase() + filterStatus.slice(1)} Reminders`}
          </h3>
        </div>
        <div className="divide-y divide-gray-200">
          {filteredReminders.map((reminder) => {
            const status = getReminderStatus(reminder);
            const statusColor = getStatusColor(status);
            
            return (
              <div key={reminder.id} className="p-6 hover:bg-gray-50 transition-colors duration-200">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h4 className={`font-semibold ${reminder.isCompleted ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                        {reminder.title}
                      </h4>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusColor}`}>
                        {status}
                      </span>
                    </div>
                    
                    <p className="text-gray-600 mb-3">{reminder.description}</p>
                    
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Bell className="h-4 w-4" />
                        <span>For: {reminder.recipientName}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>Due: {formatDate(reminder.dueDate)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 ml-4">
                    <button
                      onClick={() => handleToggleComplete(reminder)}
                      className={`p-2 rounded-lg transition-colors duration-200 ${
                        reminder.isCompleted 
                          ? 'bg-green-100 text-green-600 hover:bg-green-200' 
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                      title={reminder.isCompleted ? 'Mark as pending' : 'Mark as complete'}
                    >
                      <Check size={16} />
                    </button>
                    
                    <button
                      onClick={() => handleEdit(reminder)}
                      className="p-2 text-blue-600 hover:text-blue-900 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                      title="Edit"
                    >
                      <Edit size={16} />
                    </button>
                    
                    <button
                      onClick={() => handleDelete(reminder.id)}
                      className="p-2 text-red-600 hover:text-red-900 hover:bg-red-50 rounded-lg transition-colors duration-200"
                      title="Delete"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredReminders.length === 0 && (
          <div className="text-center py-12">
            <Bell className="mx-auto h-24 w-24 text-gray-400" />
            <h3 className="mt-4 text-lg font-medium text-gray-900">No reminders found</h3>
            <p className="mt-2 text-gray-500">
              {searchTerm ? 'Try searching with different keywords' : 'Get started by adding your first reminder'}
            </p>
          </div>
        )}
      </div>

      <ReminderForm
        isOpen={isFormOpen}
        onClose={handleFormClose}
        editReminder={editingReminder}
      />
    </div>
  );
};

export default Reminders;