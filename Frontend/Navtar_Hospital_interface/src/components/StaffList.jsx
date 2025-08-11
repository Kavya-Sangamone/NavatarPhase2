import React, { useState } from 'react';
import {
  Search,
  Filter,
  Users,
  UserCheck,
  Stethoscope,
  Heart,
  Bot
} from 'lucide-react';
import { StaffCard } from './StaffCard';
import '../App.css';

export const StaffList = ({ staff, navatars, onDelete, onEdit }) => {
  const [filters, setFilters] = useState({
    role: 'all',
    searchTerm: ''
  });
  const [navatarFilters, setNavatarFilters] = useState({
    searchTerm: '',
    status: 'all',
  });


  const filteredStaff = staff.filter((member) => {
    const roleMatch = filters.role === 'all' || member.role === filters.role;

    const searchTerm = filters.searchTerm || "";

    const nameMatch = (member.name || '').toLowerCase().includes(searchTerm);
    const departmentMatch = (member.department || '').toLowerCase().includes(searchTerm);

    return roleMatch && (nameMatch || departmentMatch);
  });

  const filteredNavatars = navatars.filter((nav) => {
    const nameMatch = (nav.name || '').toLowerCase().includes(navatarFilters.searchTerm.toLowerCase());
    const statusMatch = navatarFilters.status === 'all' || nav.status === navatarFilters.status;
    return nameMatch && statusMatch;
  });


  const doctorCount = staff.filter((s) => s.role === "Doctor").length;
  const nurseCount = staff.filter((s) => s.role === "Nurse").length;
  const navatarCount = navatars.length;

  return (
    <div className="staff-list-container">
      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stats-card">
          <div className="stats-content">
            <div className="stats-icon icon-blue">
              <Users className="icon-lg text-blue" />
            </div>
            <div>
              <p className="stats-number">{staff.length}</p>
              <p className="stats-label">Total Staff</p>
            </div>
          </div>
        </div>

        <div className="stats-card">
          <div className="stats-content">
            <div className="stats-icon icon-blue">
              <Stethoscope className="icon-lg text-blue" />
            </div>
            <div>
              <p className="stats-number">{doctorCount}</p>
              <p className="stats-label">Doctors</p>
            </div>
          </div>
        </div>

        <div className="stats-card">
          <div className="stats-content">
            <div className="stats-icon icon-green">
              <Heart className="icon-lg text-green" />
            </div>
            <div>
              <p className="stats-number">{nurseCount}</p>
              <p className="stats-label">Nurses</p>
            </div>
          </div>
        </div>

        <div className="stats-card">
          <div className="stats-content">
            <div className="stats-icon icon-green">
              <Bot className="icon-lg text-green" />
            </div>
            <div>
              <p className="stats-number">{navatarCount}</p>
              <p className="stats-label">Navatars</p>
            </div>
          </div>
        </div>
      </div>
      <div className="sections">
        <div className="staff-section">
          <div className="filters-card">
            <div className="filters-container">
              <div className="search-input-wrapper">
                <Search className="search-icon" />
                <input
                  type="text"
                  placeholder="Search by name, or department..."
                  value={filters.searchTerm}
                  onChange={(e) =>
                    setFilters((prev) => ({ ...prev, searchTerm: e.target.value }))
                  }
                  className="search-input"
                />
              </div>

              <div className="role-select-wrapper">
                <Filter className="filter-icon" />
                <select
                  value={filters.role}
                  onChange={(e) =>
                    setFilters((prev) => ({ ...prev, role: e.target.value }))
                  }
                  className="role-select"
                >
                  <option value="all">All Roles</option>
                  <option value={"Doctor"}>Doctors</option>
                  <option value={"Nurse"}>Nurses</option>
                </select>
              </div>
            </div>
          </div>

          {/* Staff Grid */}
          {
            filteredStaff.length === 0 ? (
              <div className="no-results">
                <UserCheck className="no-results-icon" />
                <h3 className="no-results-title">No staff members found</h3>
                <p className="no-results-subtext">
                  {filters.searchTerm || filters.role !== 'all'
                    ? 'Try adjusting your search or filters'
                    : 'Add your first staff member to get started'}
                </p>
              </div>
            ) : (
              <div className="staff-grid">
                {filteredStaff.map((member) => (
                  <StaffCard
                    key={`${member.role}-${member.id}`}
                    staff={member}
                    onDelete={onDelete}
                    onEdit={onEdit}
                  />
                ))}
              </div>
            )
          }
        </div>
      
      </div >
    </div >
  );
};
