import axios from './axiosInstance';


// const BASE_URL = "http://127.0.0.1:8000/superadmin/admins/";
const BASE_URL = "/superadmin/admins/";




export const createAdmin = (adminData) => {
  return axios.post(BASE_URL, adminData);
};

// adminApi.js
 // Adjust this to your actual API base path, e.g., '/api/admins' or '/admins'++

export const getAdmins = async (hospitalId) => {
  try {
    const response = await axios.get(`${BASE_URL}by-hospital`, {
      params: { hospital_id: hospitalId }
    });
    const data = response.data;
    // Normalize: Convert single object to array, return empty array for null/undefined
    if (Array.isArray(data)) {
      return data;
    } else if (data && typeof data === 'object') {
      return [data]; // Wrap single object in an array if needed
    }
    return []; // Return empty array for null, undefined, or invalid data
  } catch (error) {
    console.error(`Error fetching admins for hospital ${hospitalId}:`, error);
    return []; // Return empty array on error
  }
};
export const updateAdmin = (id, adminData) => {
  return axios.put(`${BASE_URL}${id}`, adminData);
};
export const deleteAdmin = (id) => {
  return axios.delete(`${BASE_URL}${id}`);
};