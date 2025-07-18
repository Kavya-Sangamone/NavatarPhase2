const STORAGE_KEY = 'hospital-staff-data';

export const saveStaffToStorage = (staff) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(staff));
  } catch (error) {
    console.error('Error saving staff data:', error);
  }
};

export const loadStaffFromStorage = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      return parsed.map((staff) => ({
        ...staff,
        createdAt: new Date(staff.createdAt)
      }));
    }
  } catch (error) {
    console.error('Error loading staff data:', error);
  }
  return [];
};