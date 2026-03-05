import axios from 'axios';

const api = axios.create({
  baseURL: 'https://simmpa-backend.onrender.com/'
});

export default api;