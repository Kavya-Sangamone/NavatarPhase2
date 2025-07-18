import React, { useState } from 'react';
import { Search, Filter, Users, UserCheck, Stethoscope, Heart } from 'lucide-react';
import { StaffRoles, createStaffFilters } from '../types/staff';
import { StaffCard } from './StaffCard';

export const StaffList = ({ staff, onDelete, onEdit }) => {
  const [filters, setFilters] = useState(createStaffFilters());

  const filteredStaff = staff.filter(member => {
    const matchesRole = filters.role === 'all' || member.role === filters.role;
    const matchesSearch = member.name.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
                         member.email.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
                         (member.department && member.department.toLowerCase().includes(filters.searchTerm.toLowerCase()));
    return matchesRole && matchesSearch;
  });

  const doctorCount = staff.filter(s => s.role === StaffRoles.DOCTOR).length;
  const nurseCount = staff.filter(s => s.role === StaffRoles.NURSE).length;

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800">{staff.length}</p>
              <p className="text-sm text-gray-600">Total Staff</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Stethoscope className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800">{doctorCount}</p>
              <p className="text-sm text-gray-600">Doctors</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <Heart className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800">{nurseCount}</p>
              <p className="text-sm text-gray-600">Nurses</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by name, email, or department..."
              value={filters.searchTerm}
              onChange={(e) => setFilters(prev => ({ ...prev, searchTerm: e.target.value }))}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
            />
          </div>
          
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-400" />
            <select
              value={filters.role}
              onChange={(e) => setFilters(prev => ({ ...prev, role: e.target.value }))}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
            >
              <option value="all">All Roles</option>
              <option value={StaffRoles.DOCTOR}>Doctors</option>
              <option value={StaffRoles.NURSE}>Nurses</option>
            </select>
          </div>
        </div>
      </div>

      {/* Staff Grid */}
      {filteredStaff.length === 0 ? (
        <div className="text-center py-12">
          <UserCheck className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-600 mb-2">No staff members found</h3>
          <p className="text-gray-500">
            {filters.searchTerm || filters.role !== 'all' 
              ? 'Try adjusting your search or filters' 
              : 'Add your first staff member to get started'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStaff.map(member => (
            <StaffCard
              key={member.id}
              staff={member}
              onDelete={onDelete}
              onEdit={onEdit}
            />
          ))}
        </div>
      )}
    </div>
  );
};