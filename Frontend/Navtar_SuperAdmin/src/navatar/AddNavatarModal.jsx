import React, { useState } from "react";
import { createNavatar } from "../apis/navatarApi";
import Modal from "../Modal";
import { Loader2 } from 'lucide-react';

const AddNavatarModal = ({ onClose, fetchNavatars }) => {
  const [formData, setFormData] = useState({
    navatar_name: "",
    status: "Offline"
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalConfig, setModalConfig] = useState({
    title: "",
    message: "",
    onConfirm: () => { },
    onCancel: null,
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createNavatar(formData);
      setModalConfig({
        title: "Success",
        message: "Navatar added successfully!",
        onConfirm: () => {
          setIsModalOpen(false);
          setFormData({ navatar_name: "" });
          onClose();
        },
      });
      await fetchNavatars();
      setIsModalOpen(true);
    } catch (err) {
      setModalConfig({
        title: "Error",
        message: `${err.response?.data?.detail || "Something went wrong"}`,
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

        <h2 className="modal-title">Add Navatar</h2>

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
                  Adding...
                </span>
              ) : (
                "Add Navatar"
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

export default AddNavatarModal;
