import axios from './axiosInstance';


// const BASE_URL = "http://127.0.0.1:8000/superadmin/admins/";
const BASE_URL = "/superadmin/admins/";




export const createAdmin = (adminData) => {
  return axios.post(BASE_URL, adminData);
};

export const getAdmins = (hospitalId) => {
  return axios.get(`${BASE_URL}${hospitalId}/`);
}