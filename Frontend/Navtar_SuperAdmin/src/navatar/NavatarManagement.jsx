import React, { useEffect, useState } from 'react';
import { Search, RefreshCcw, Calendar, Bot, Building2, Eye, Edit3, Trash2 } from 'lucide-react';
import { deleteNavatar } from '../apis/navatarApi';
import UpdateNavatarModal from './UpdateNavatarModal';
import { fetchHospitals } from '../apis/hospitalApi';
import Modal from "../Modal";

function NavatarManagement({ navatars, fetchNavatars }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedNavatar, setSelectedNavatar] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [hospitalMap, setHospitalMap] = useState({});
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalConfig, setModalConfig] = useState({
    title: "",
    message: "",
    onConfirm: () => { },
    onCancel: null,
  });

  const loadHospitals = async () => {
    try {
      const res = await fetchHospitals();
      const map = {};
      res.data.forEach(h => {
        map[h.hospital_id] = h.hospital_name;
      });
      setHospitalMap(map);
    } catch (err) {
      console.error("Failed to fetch hospitals", err);
    }
  };

  useEffect(() => {
    loadHospitals();
  }, []);

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
  };

  const handleEditNavatar = (navatar) => {
    setSelectedNavatar({
      ...navatar,
      hospital_id: navatar.hospital_id
    });
    setShowEditModal(true);
  };

  const handleDeleteNavatar = (id) => {
    setModalConfig({
      title: "Confirm Deletion",
      message: "Are you sure you want to delete this Navatar?",
      onConfirm: async () => {
        setIsLoading(true);
        try {
          await deleteNavatar(id);
          setIsLoading(false);
          setModalConfig({
            title: "Deleted",
            message: "Navatar deleted successfully!",
            onConfirm: () => {
              setIsModalOpen(false);
              fetchNavatars();
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
    await loadHospitals();
    await fetchNavatars();
    setIsRefreshing(false);
  };

  const filteredNavatar = navatars.filter(navatar =>
    navatar.navatar_name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="management-container">
      <div className="header-section">
        <h2 className="title">Navatar Management</h2>
        <div className="search-wrapper">
          <Search className="search-icon" />
          <input
            type="text"
            placeholder="Search Navatar..."
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
              <th>Navatar</th>
              <th>Assigned Hospital</th>
              <th>Created</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredNavatar.map((navatar) => (
              <tr key={navatar.navatar_id}>
                <td>
                  <div className="info">
                    <div className="icon"><Bot /></div>
                    <div>
                      <div className="name">{navatar.navatar_name}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <Building2 className="inline-icon" />
                  {hospitalMap[navatar.hospital_id] || 'Not Assigned'}
                </td>
                <td>
                  <Calendar className="inline-icon" />
                  {formatDate(navatar.created_at)}
                </td>
                <td>
                  <div className="action-buttons">
                    
                    <button onClick={() => handleEditNavatar(navatar)} title="Edit"><Edit3 /></button>
                   
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredNavatar.length === 0 && (
          <div className="empty-state">
            <Building2 className="empty-icon" />
            <p>No Navatar found matching your criteria</p>
          </div>
        )}
      </div>

      {showEditModal && (
        <UpdateNavatarModal
          navatarData={selectedNavatar}
          onClose={() => setShowEditModal(false)}
          fetchNavatars={fetchNavatars}
          hospitalMap={hospitalMap}
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

export default NavatarManagement;
