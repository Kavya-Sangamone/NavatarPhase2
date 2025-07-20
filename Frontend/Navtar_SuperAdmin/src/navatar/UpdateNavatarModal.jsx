import React, { useState, useEffect } from "react";
import { updateNavatar } from "../apis/navatarApi";
import Select from "react-select";
import Modal from "../Modal";
import { Loader2 } from 'lucide-react';

const UpdateNavatarModal = ({ navatarData, onClose, fetchNavatars, hospitalMap }) => {
  const [formData, setFormData] = useState({
    navatar_name: '',
    hospital_id: '',
    status: "Offline",
  });
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalConfig, setModalConfig] = useState({
    title: "",
    message: "",
    onConfirm: () => { },
    onCancel: null,
  });

  useEffect(() => {
    if (navatarData) {
      setFormData({
        navatar_name: navatarData.navatar_name || "",
        hospital_id: String(navatarData.hospital_id) || "",
        status: navatarData.status || "Offline",
      });
    }
  }, [navatarData]);

  const hospitalOptions = Object.entries(hospitalMap).map(([id, name]) => ({
    value: String(id),
    label: name,
  }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await updateNavatar(navatarData.navatar_id, {
        ...formData,
        hospital_id: Number(formData.hospital_id),
      });

      setModalConfig({
        title: "Success",
        message: "Navatar updated successfully!",
        onConfirm: () => {
          setIsModalOpen(false);
          setFormData({
            navatar_name: "",
            hospital_id: "",
            status: "Offline",
          });
          onClose();
          fetchNavatars();
        },
      });
      setIsModalOpen(true);
    } catch (err) {
      setModalConfig({
        title: "Error",
        message: `Error: ${err.response?.data?.detail || "Something went wrong"}`,
        onConfirm: () => setIsModalOpen(false),
      });
      setIsModalOpen(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <button onClick={onClose} className="modal-close-button">
          &times;
        </button>

        <h2 className="modal-title">Update Navatar</h2>

        <form onSubmit={handleSubmit} className="form">
          <div className="form-group">
            <label className="form-label">Navatar Name</label>
            <input
              type="text"
              value={formData.navatar_name}
              onChange={(e) =>
                setFormData({ ...formData, navatar_name: e.target.value })
              }
              required
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Hospital</label>
            <Select
              name="hospital_id"
              value={hospitalOptions.find(
                (option) => option.value === String(formData.hospital_id)
              )}
              onChange={(selectedOption) =>
                setFormData({ ...formData, hospital_id: selectedOption?.value || "" })
              }
              options={hospitalOptions}
              placeholder="Select Hospital"
              isClearable
            />
          </div>

          <div className="form-actions">
            <button type="button" onClick={onClose} className="button-cancel">
              Cancel
            </button>
            <button
              type="submit"
              className="button-submit"
              disabled={loading}
            >
              {loading ? (
                <span className="button-loading">
                  <Loader2 className="spinner" />
                  Updating...
                </span>
              ) : (
                "Update Hospital"
              )}
            </button>

          </div>
        </form>
      </div>

      <Modal
        isOpen={isModalOpen}
        title={modalConfig.title}
        message={modalConfig.message}
        onConfirm={modalConfig.onConfirm}
        onCancel={modalConfig.onCancel}
      />
    </div>
  );
};

export default UpdateNavatarModal;
