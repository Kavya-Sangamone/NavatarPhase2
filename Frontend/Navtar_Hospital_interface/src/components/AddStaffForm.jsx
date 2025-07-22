import React, { useState } from 'react';
import { Plus, UserPlus, X } from 'lucide-react';
import '../App.css';

export const AddStaffForm = ({ onAddStaff, isOpen, onClose, doctors }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'Doctor',
    department: '',
    phone: '',
    gender: 'Male',
    assigned_doctor_id: '',
  });

  const [errors, setErrors] = useState({});
  const doctorDepartments = ["Cardiology", "Surgery", "Pediatrics", "Neurology"];
  const nurseDepartments = ["ICU", "Pediatrics", "Emergency", "Ward"];

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.department.trim()) newErrors.department = 'Department is required';
    if (formData.role === 'Nurse' && !formData.assigned_doctor_id) {
      newErrors.assigned_doctor_id = 'Please assign a doctor to the nurse';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onAddStaff(formData);
      setFormData({
        name: '',
        email: '',
        role: 'Doctor',
        department: '',
        phone: '',
        gender: 'Male',
        assigned_doctor_id: '',
      });
      setErrors({});
      onClose();
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <div className="modal-header">
          <div className="modal-header-left">
            <div className="modal-icon-box">
              <UserPlus className="modal-icon" />
            </div>
            <h2 className="modal-title">Add Staff Member</h2>
          </div>
          <button onClick={onClose} className="modal-close-btn">
            <X className="close-icon" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label className="form-label">Full Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`form-input ${errors.name ? 'input-error' : ''}`}
              placeholder="Enter full name"
            />
            {errors.name && <p className="form-error">{errors.name}</p>}
          </div>

          <div className="form-group">
            <label className="form-label">Email Address *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`form-input ${errors.email ? 'input-error' : ''}`}
              placeholder="Enter email address"
            />
            {errors.email && <p className="form-error">{errors.email}</p>}
          </div>

          <div className="form-group">
            <label className="form-label">Role *</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="form-input"
            >
              <option value="Doctor">Doctor</option>
              <option value="Nurse">Nurse</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Gender *</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="form-input"
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Assigned Doctor (Only for Nurse) */}
          {formData.role === 'Nurse' && (
            <div className="form-group">
              <label className="form-label">Assign to Doctor *</label>
              <select
                name="assigned_doctor_id"
                value={formData.assigned_doctor_id}
                onChange={handleChange}
                className={`form-input ${errors.assigned_doctor_id ? 'input-error' : ''}`}
              >
                <option value="">Select Doctor</option>
                {doctors.map(doc => (
                  <option key={doc.id} value={doc.id}>
                    {doc.name}
                  </option>
                ))}
              </select>
              {errors.assigned_doctor_id && (
                <p className="form-error">{errors.assigned_doctor_id}</p>
              )}
            </div>
          )}

          {/* Department */}
          <div className="form-group">
            <label className="form-label">Department *</label>
            <select
              name="department"
              value={formData.department}
              onChange={handleChange}
              className={`form-input ${errors.department ? 'input-error' : ''}`}
            >
              <option value="">Select Department</option>
              {(formData.role === "Doctor" ? doctorDepartments : nurseDepartments).map((dept) => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
            {errors.department && <p className="form-error">{errors.department}</p>}
          </div>

          {/* Phone */}
          <div className="form-group">
            <label className="form-label">Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="form-input"
              placeholder="Enter phone number"
            />
          </div>

          {/* Buttons */}
          <div className="form-actions">
            <button type="button" onClick={onClose} className="cancel-btn">
              Cancel
            </button>
            <button type="submit" className="submit-btn">
              <Plus className="submit-icon" />
              Add Staff
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
