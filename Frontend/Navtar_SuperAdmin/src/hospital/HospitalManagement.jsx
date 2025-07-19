import React, { useEffect, useState } from 'react';
import { Search, MapPin, Calendar, Bot, Building2, Eye, Edit3, Trash2 } from 'lucide-react';
import { deleteHospital } from './hospitalApi';

function HospitalManagement({ hospitals, fetchHospitals }) {
  const [searchTerm, setSearchTerm] = useState('');

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
  };

  const handleEditHospital = (id) => {
    alert("Updating hospital:", id);
  };

  const handleDeleteHospital = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this hospital? ");
    if (confirmDelete) {
      try {
        await deleteHospital(id);
        alert("Hospital deleted successfully!");
        fetchHospitals();
      } catch (err) {
        alert(`Delete failed: ${err.response?.data?.detail || "Unknown error"}`);
      }
    }
  };


  const filteredHospitals = hospitals.filter(hospital =>
    hospital.hospital_name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="hospital-management-container">
      <div className="header-section">
        <h2 className="title">Hospital Management</h2>
        <div className="search-wrapper">
          <Search className="search-icon" />
          <input
            type="text"
            placeholder="Search hospitals..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      <div className="table-container">
        <table className="hospital-table">
          <thead>
            <tr>
              <th>Hospital</th>
              <th>Location</th>
              <th>Created</th>
              <th>Navatars</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredHospitals.map((hospital) => (
              <tr key={hospital.hospital_id}>
                <td>
                  <div className="hospital-info">
                    <div className="hospital-icon"><Building2 /></div>
                    <div>
                      <div className="hospital-name">{hospital.hospital_name}</div>
                      <div className="hospital-email">{hospital.contactEmail}</div>
                    </div>
                  </div>
                </td>
                <td><MapPin className="inline-icon" />{hospital.country}</td>
                <td><Calendar className="inline-icon" />{formatDate(hospital.created_at)}</td>
                <td><Bot className="inline-icon purple" /><span>{hospital.totalNavatars} </span></td>
                <td>
                  <div className="action-buttons">
                    <button title="Toggle Status"><Eye /></button>
                    <button onClick={() => handleEditHospital(hospital.hospital_id)} title="Edit"><Edit3 /></button>
                    <button onClick={() => handleDeleteHospital(hospital.hospital_id)} title="Delete"><Trash2 /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredHospitals.length === 0 && (
          <div className="empty-state">
            <Building2 className="empty-icon" />
            <p>No hospitals found matching your criteria</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default HospitalManagement;
