import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://66b386687fba54a5b7ed49a8.mockapi.io/api/v1/',
  headers: { 'Content-Type': 'application/json' },
});
export default axiosInstance;
