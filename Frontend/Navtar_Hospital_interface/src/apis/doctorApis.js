import axios from "./axiosInstance";

const BASE_URL = "/admin";

// Create a new doctor
export const createDoctor = (hospitalId, doctorData) => {
  return axios.post(`${BASE_URL}/${hospitalId}/doctors`, doctorData);
};

// Get all doctors under a hospital
export const listDoctors = (hospitalId) => {
  return axios.get(`${BASE_URL}/${hospitalId}/doctors`);
};

// Get a specific doctor by ID
export const getDoctor = (doctorId) => {
  return axios.get(`${BASE_URL}/doctors/${doctorId}`);
};

// Update a doctor by ID
export const updateDoctor = (doctorId, updatedData) => {
  return axios.put(`${BASE_URL}/doctors/${doctorId}`, updatedData);
};

// Delete a doctor by ID
export const deleteDoctor = (doctorId) => {
  return axios.delete(`${BASE_URL}/doctors/${doctorId}`);
};
