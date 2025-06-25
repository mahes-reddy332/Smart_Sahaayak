import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { generateId } from '../../utils/calculations';
import { Reminder } from '../../types';

interface ReminderFormProps {
  isOpen: boolean;
  onClose: () => void;
  editReminder?: Reminder;
}

const ReminderForm: React.FC<ReminderFormProps> = ({ isOpen, onClose, editReminder }) => {
  const { dispatch, state } = useApp();
  const [formData, setFormData] = useState({
    title: editReminder?.title || '',
    description: editReminder?.description || '',
    recipientName: editReminder?.recipientName || '',
    recipientPhone: editReminder?.recipientPhone || '',
    dueDate: editReminder?.dueDate ? new Date(editReminder.dueDate).toISOString().slice(0, 16) : '',
    isCompleted: editReminder?.isCompleted || false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const reminder: Reminder = {
      id: editReminder?.id || generateId(),
      title: formData.title,
      description: formData.description,
      recipientName: formData.recipientName,
      recipientPhone: formData.recipientPhone,
      dueDate: new Date(formData.dueDate),
      isCompleted: formData.isCompleted,
      createdAt: editReminder?.createdAt || new Date()
    };

    if (editReminder) {
      dispatch({ type: 'UPDATE_REMINDER', payload: reminder });
    } else {
      dispatch({ type: 'ADD_REMINDER', payload: reminder });
    }

    onClose();
    setFormData({ 
      title: '', 
      description: '', 
      recipientName: '', 
      recipientPhone: '', 
      dueDate: '', 
      isCompleted: false 
    });
  };

  const handleContactSelect = (contactId: string) => {
    const contact = state.contacts.find(c => c.id === contactId);
    if (contact) {
      setFormData({
        ...formData,
        recipientName: contact.name,
        recipientPhone: contact.phone
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-lg">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold">
            {editReminder ? 'Edit Reminder' : 'Add New Reminder'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Reminder Title
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., Call supplier for restock"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
              placeholder="Additional details about this reminder..."
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Select Contact (Optional)
            </label>
            <select
              onChange={(e) => handleContactSelect(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
            >
              <option value="">Choose from contacts...</option>
              {state.contacts.map(contact => (
                <option key={contact.id} value={contact.id}>
                  {contact.name} - {contact.phone}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Recipient Name
              </label>
              <input
                type="text"
                value={formData.recipientName}
                onChange={(e) => setFormData({ ...formData, recipientName: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                value={formData.recipientPhone}
                onChange={(e) => setFormData({ ...formData, recipientPhone: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Due Date & Time
            </label>
            <input
              type="datetime-local"
              value={formData.dueDate}
              onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {editReminder && (
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="completed"
                checked={formData.isCompleted}
                onChange={(e) => setFormData({ ...formData, isCompleted: e.target.checked })}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="completed" className="text-sm text-gray-700">
                Mark as completed
              </label>
            </div>
          )}

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
              <span>{editReminder ? 'Update' : 'Add'} Reminder</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReminderForm;