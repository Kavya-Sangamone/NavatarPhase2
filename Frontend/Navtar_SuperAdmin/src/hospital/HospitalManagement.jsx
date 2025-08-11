import React, { useEffect, useState } from 'react';
import { Search, RefreshCcw, MapPin, Calendar, Bot, Building2, Eye, Edit3, Trash2 } from 'lucide-react';
import { deleteHospital } from '../apis/hospitalApi';
import UpdateHospitalModal from './UpdateHospitalModal';
import Modal from '../Modal';     
import { useNavigate } from 'react-router-dom';

function HospitalManagement({ hospitals, fetchHospitals }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalConfig, setModalConfig] = useState({
    title: "",
    message: "",
    onConfirm: () => { },
    onCancel: null,
  });
  const navigate = useNavigate();

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
  };

  const handleEditHospital = (hospital) => {
    setSelectedHospital(hospital);
    setShowEditModal(true);
  };
  const handleDeleteHospital = (id) => {
    setModalConfig({
      title: "Confirm Deletion",
      message: "Are you sure you want to delete this Hospital?",
      onConfirm: async () => {
        setIsLoading(true);
        try {
          await deleteHospital(id);
          setIsLoading(false);
          setModalConfig({
            title: "Deleted",
            message: "Hospital deleted successfully!",
            onConfirm: () => {
              setIsModalOpen(false);
              fetchHospitals();
            },
            onCancel: null,
          });
        } catch (err) {
          setIsLoading(false);
          setModalConfig({
            title: "Error",
            message: `Delete failed: ${err.response?.data?.detail || "Unknown error"}`,
            onConfirm: () => setIsModalOpen(false),
            onCancel: null,
          });
        }
      },
      onCancel: () => setIsModalOpen(false),
    });
    setIsModalOpen(true);
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    setSearchTerm("");
    await fetchHospitals();
    setIsRefreshing(false);
  };  

  const handleClickHospital = (hospitalId) => {
    navigate(`/hospital/${hospitalId}`);
  };


  const filteredHospitals = hospitals.filter(hospital =>
    hospital.hospital_name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  

  return (
    <div className="management-container">
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
          <RefreshCcw
            className={`refresh-icon ${isRefreshing ? "spinning" : ""}`}
            onClick={handleRefresh}
          />
        </div>
      </div>

      <div className="table-container">
        <table className="table">
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
                  <div className="info">
                    <div className="icon"><Building2 /></div>
                    <div>
                      <div className="name">{hospital.hospital_name}</div>
                      <div className="email">{hospital.contactEmail}</div>
                    </div>
                  </div>
                </td>
                <td><MapPin className="inline-icon" />{hospital.country}</td>
                <td><Calendar className="inline-icon" />{formatDate(hospital.created_at)}</td>
                <td><Bot className="inline-icon purple" /><span>{hospital.totalNavatars} </span></td>
                <td>
                  <div className="action-buttons">
                    <button onClick={()=>navigate(`/hospital/${hospital.hospital_id}`)}
              className="text-blue-500 hover:text-blue-700"
              title="View Details"><Eye /></button>
                    <button onClick={() => handleEditHospital(hospital)} title="Edit"><Edit3 /></button>
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
      {showEditModal && (
        <UpdateHospitalModal
          hospitalData={selectedHospital}
          onClose={() => setShowEditModal(false)}
          fetchHospitals={fetchHospitals}
        />
      )}
      <Modal
        isOpen={isModalOpen}
        title={modalConfig.title}
        message={modalConfig.message}
        onConfirm={modalConfig.onConfirm}
        onCancel={modalConfig.onCancel}
        isLoading={isLoading}
      />
    </div>
  );
}

export default HospitalManagement;
