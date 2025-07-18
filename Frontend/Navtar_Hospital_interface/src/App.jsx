import React, { useState, useEffect } from 'react';
import { Plus, Building2 } from 'lucide-react';
import { createStaffMember } from './types/staff';
import { AddStaffForm } from './components/AddStaffForm';
import { StaffList } from './components/StaffList';
import { EditStaffModal } from './components/EditStaffModal';
import { saveStaffToStorage, loadStaffFromStorage } from './utils/storage';

function App() {
  const [staff, setStaff] = useState([]);
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);
  const [editingStaff, setEditingStaff] = useState(null);

  useEffect(() => {
    const savedStaff = loadStaffFromStorage();
    setStaff(savedStaff);
  }, []);

  useEffect(() => {
    saveStaffToStorage(staff);
  }, [staff]);

  const handleAddStaff = (newStaffData) => {
    const staffMember = createStaffMember(
      newStaffData.name,
      newStaffData.email,
      newStaffData.role,
      newStaffData.department,
      newStaffData.phone
    );
    setStaff(prev => [...prev, staffMember]);
  };

  const handleDeleteStaff = (id) => {
    if (window.confirm('Are you sure you want to delete this staff member?')) {
      setStaff(prev => prev.filter(s => s.id !== id));
    }
  };

  const handleEditStaff = (updatedStaff) => {
    setStaff(prev => prev.map(s => s.id === updatedStaff.id ? updatedStaff : s));
    setEditingStaff(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-600 rounded-lg">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-800">Hospital Staff Management</h1>
                <p className="text-sm text-gray-600">Manage doctors and nurses</p>
              </div>
            </div>
            <button
              onClick={() => setIsAddFormOpen(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
            >
              <Plus className="w-4 h-4" />
              Add Staff
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <StaffList
          staff={staff}
          onDelete={handleDeleteStaff}
          onEdit={setEditingStaff}
        />
      </main>

      {/* Modals */}
      <AddStaffForm
        isOpen={isAddFormOpen}
        onClose={() => setIsAddFormOpen(false)}
        onAddStaff={handleAddStaff}
      />

      <EditStaffModal
        staff={editingStaff}
        onSave={handleEditStaff}
        onClose={() => setEditingStaff(null)}
      />
    </div>
  );
}

export default App;