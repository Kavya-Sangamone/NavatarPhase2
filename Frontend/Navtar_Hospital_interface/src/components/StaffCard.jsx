import { Mail, Phone, Stethoscope, Heart, Trash2, Edit } from 'lucide-react';
import '../App.css';

export const StaffCard = ({ staff, onDelete, onEdit }) => {
  const roleColors = {
    ["Doctor"]: 'doctor-role',
    ["Nurse"]: 'nurse-role'
  };

  const roleIcons = {
    ["Doctor"]: <Stethoscope className="icon-small" />,
    ["Nurse"]: <Heart className="icon-small" />
  };

  return (
    <div className="staff-card">
      <div className="card-content">
        <div className="card-header">
          <div className="staff-info">
            <div className={`role-icon ${roleColors[staff.role]}`}>
              {roleIcons[staff.role]}
            </div>
            <div>
              <h3 className="staff-name">{staff.name}</h3>
              <span className={`role-badge ${roleColors[staff.role]}`}>
                {staff.role.charAt(0).toUpperCase() + staff.role.slice(1)}
              </span>
            </div>
          </div>
          <div className="action-buttons">
            <button
              onClick={() => onEdit(staff)}
              className="edit-button"
            >
              <Edit className="icon-small" />
            </button>
            <button
              onClick={() => onDelete(staff.id, staff.role)}
              className="delete-button"
            >
              <Trash2 className="icon-small" />
            </button>
          </div>
        </div>

        <div className="staff-details">
          <div className="detail-item">
            <Mail className="icon-small" />
            <span>{staff.email}</span>
          </div>
          {staff.role === "Nurse" && staff.assigned_doctor && (
            <div className="assigned-doctor-info">
              <span className="label">Assigned Doctor</span>
              <span className="value">{staff.assigned_doctor.name}</span>
            </div>
          )}

          {staff.phone && (
            <div className="detail-item">
              <Phone className="icon-small" />
              <span>{staff.phone}</span>
            </div>
          )}

          <div className="department-info">
            <span className="label">Department</span>
            <span className="value">{staff.department}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
