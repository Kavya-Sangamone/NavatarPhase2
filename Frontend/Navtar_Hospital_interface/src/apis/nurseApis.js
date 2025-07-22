import axios from "./axiosInstance";

const BASE_URL = "/admin";

// Create a nurse for a doctor
export const createNurse = (doctorId, nurseData) => {
  return axios.post(`${BASE_URL}/doctors/${doctorId}/nurses`, nurseData);
};
// Get all nurses under a doctor
export const getNursesByDoctor = (doctorId) => {
  return axios.get(`${BASE_URL}/doctors/${doctorId}/nurses`);
};
// Get a nurse by nurse ID
export const getNurseById = (nurseId) => {
  return axios.get(`${BASE_URL}/nurses/${nurseId}`);
};
// Update nurse details
export const updateNurse = (nurseId, updateData) => {
  return axios.put(`${BASE_URL}/nurses/${nurseId}`, updateData);
};
// Delete a nurse
export const deleteNurse = (nurseId) => {
  return axios.delete(`${BASE_URL}/nurses/${nurseId}`);
};
// Get all nurses under a hospital
export const getNursesByHospital = (hospitalId) => {
  return axios.get(`${BASE_URL}/hospitals/${hospitalId}/nurses`);
};
