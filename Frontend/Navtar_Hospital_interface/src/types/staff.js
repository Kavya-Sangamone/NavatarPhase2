// Staff member structure and filters for JavaScript
export const StaffRoles = {
  DOCTOR: 'doctor',
  NURSE: 'nurse'
};

export const createStaffMember = (name, email, role, department = '', phone = '') => ({
  id: crypto.randomUUID(),
  name,
  email,
  role,
  department,
  phone,
  createdAt: new Date()
});

export const createStaffFilters = () => ({
  role: 'all',
  searchTerm: ''
});