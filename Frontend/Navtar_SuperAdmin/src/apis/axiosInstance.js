import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: "https://navatar-ashen.vercel.app",
  
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
