import React, { useState, useEffect, useMemo } from "react";
import Select from "react-select";
import countryList from "react-select-country-list";
import { updateHospital } from "../apis/hospitalApi";
import { Loader2 } from 'lucide-react';
import Modal from "../Modal";

const UpdateHospitalModal = ({ hospitalData, onClose, fetchHospitals }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    hospital_name: "",
    country: "",
    pincode: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalConfig, setModalConfig] = useState({
    title: "",
    message: "",
    onConfirm: () => { },
    onCancel: null,
  });

  const options = useMemo(() => countryList().getData(), []);

  useEffect(() => {
    if (hospitalData) {
      setFormData({
        hospital_name: hospitalData.hospital_name || "",
        country: hospitalData.country || "",
        pincode: hospitalData.pincode || "",
      });
    }
  }, [hospitalData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateHospital(hospitalData.hospital_id, formData);
      setModalConfig({
        title: "Success",
        message: "Hospital updated successfully!",
        onConfirm: () => {
          setIsModalOpen(false);
          setFormData({
            hospital_name: "",
            country: "",
            pincode: "",
          });
          onClose();
          fetchHospitals();
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

  const handleCountryChange = (selectedOption) => {
    setFormData({ ...formData, country: selectedOption.label });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <button onClick={onClose} className="modal-close-button">
          &times;
        </button>

        <h2 className="modal-title">Update Hospital</h2>

        <form onSubmit={handleSubmit} className="form">
          <div className="form-group">
            <label className="form-label">Hospital Name</label>
            <input
              type="text"
              value={formData.hospital_name}
              onChange={(e) =>
                setFormData({ ...formData, hospital_name: e.target.value })
              }
              required
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Country</label>
            <Select
              options={options}
              value={options.find((opt) => opt.label === formData.country)}
              onChange={handleCountryChange}
              placeholder="Select Country"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Pincode</label>
            <input
              type="text"
              value={formData.pincode}
              onChange={(e) =>
                setFormData({ ...formData, pincode: e.target.value })
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

export default UpdateHospitalModal;
