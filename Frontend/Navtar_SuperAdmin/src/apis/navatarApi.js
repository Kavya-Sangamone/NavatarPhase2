import axios from "./axiosInstance";

//const BASE_URL = "http://127.0.0.1:8000/superadmin/navatars";
const BASE_URL = "/superadmin/navatars/"

// Fetch all navatars
export const fetchNavatars = () => {
  return axios.get(BASE_URL);
};

// Create new navatar
export const createNavatar = (data) => {
  return axios.post(BASE_URL, data);
};

// Update navatar by ID
export const updateNavatar = (id, data) => {
  return axios.put(`${BASE_URL}${id}`, data);
};

// Delete navatar by ID
export const deleteNavatar = (id) => {
  return axios.delete(`${BASE_URL}/${id}`);
};

// Get navatar by ID
export const getNavatarById = (id) => {
  return axios.get(`${BASE_URL}${id}`);
};

// Search navatars by optional hospital_id or search_query
export const searchNavatars = (hospitalId, searchQuery) => {
  return axios.get(`${BASE_URL}/search`, {
    params: {
      hospital_id: hospitalId,
      search_query: searchQuery,
    },
  });
};

// Get navatars by hospital
export const getNavatarsByHospital = (hospitalId) => {
  return axios.get(`${BASE_URL}${hospitalId}/navatars`);
};
