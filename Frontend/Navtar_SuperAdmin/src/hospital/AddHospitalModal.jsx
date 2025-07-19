import React, { useState } from "react";
import { createHospital } from "./hospitalApi";

const AddHospitalModal = ({ onClose, fetchHospitals }) => {
  const [formData, setFormData] = useState({
    hospital_name: "",
    country: "",
    pincode: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createHospital(formData);
      alert("Hospital added successfully!");
      await fetchHospitals();
      setFormData({ hospital_name: "", country: "", pincode: "" });
      onClose();
    } catch (err) {
      alert(`Error: ${err.response?.data?.detail || "Something went wrong"}`);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <button onClick={onClose} className="modal-close-button">
          &times;
        </button>

        <h2 className="modal-title">Add Hospital</h2>

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
            <input
              type="text"
              value={formData.country}
              onChange={(e) =>
                setFormData({ ...formData, country: e.target.value })
              }
              required
              className="form-input"
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
            <button type="submit" className="button-submit">
              Add Hospital
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddHospitalModal;
