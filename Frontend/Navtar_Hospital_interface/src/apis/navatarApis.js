import axios from "./axiosInstance";

const BASE_URL = "/superadmin/navatars";

// Update navatar by ID
export const updateNavatar = (id, data) => {
  return axios.put(`${BASE_URL}/${id}`, data);
};

// Get navatars by hospital
export const getNavatarsByHospital = (hospitalId) => {
  return axios.get(`${BASE_URL}/${hospitalId}/navatars`);
};
