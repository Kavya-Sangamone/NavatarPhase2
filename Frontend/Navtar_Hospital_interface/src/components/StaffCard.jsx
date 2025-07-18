import React from 'react';
import { Mail, Phone, Stethoscope, Heart, Trash2, Edit } from 'lucide-react';
import { StaffRoles } from '../types/staff';

export const StaffCard = ({ staff, onDelete, onEdit }) => {
  const roleColors = {
    [StaffRoles.DOCTOR]: 'bg-blue-100 text-blue-800',
    [StaffRoles.NURSE]: 'bg-green-100 text-green-800'
  };

  const roleIcons = {
    [StaffRoles.DOCTOR]: <Stethoscope className="w-4 h-4" />,
    [StaffRoles.NURSE]: <Heart className="w-4 h-4" />
  };

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200 border border-gray-200">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${roleColors[staff.role]}`}>
              {roleIcons[staff.role]}
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 text-lg">{staff.name}</h3>
              <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${roleColors[staff.role]}`}>
                {staff.role.charAt(0).toUpperCase() + staff.role.slice(1)}
              </span>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => onEdit(staff)}
              className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            >
              <Edit className="w-4 h-4" />
            </button>
            <button
              onClick={() => onDelete(staff.id)}
              className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-3 text-gray-600">
            <Mail className="w-4 h-4" />
            <span className="text-sm">{staff.email}</span>
          </div>
          
          {staff.phone && (
            <div className="flex items-center gap-3 text-gray-600">
              <Phone className="w-4 h-4" />
              <span className="text-sm">{staff.phone}</span>
            </div>
          )}

          <div className="pt-2 border-t border-gray-100">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">Department</span>
              <span className="text-sm font-medium text-gray-800">{staff.department}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};