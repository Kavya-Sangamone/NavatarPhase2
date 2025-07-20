import axios from './axiosInstance';

const BASE_URL = "/superadmin/hospital";

export const fetchHospitals = () => {
  return axios.get(BASE_URL);
};

export const createHospital = (data) => {
  return axios.post(BASE_URL, data);
};

export const updateHospital = (id, data) => {
  return axios.put(`${BASE_URL}/${id}`, data);
};

export const deleteHospital = (id) => {
  return axios.delete(`${BASE_URL}/${id}`);
};

export const searchHospitals = (searchQuery) => {
  return axios.get(`${BASE_URL}/search`, {
    params: { search_query: searchQuery },
  });
};
