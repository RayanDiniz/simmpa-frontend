import axios from 'axios';

const api = axios.create({
  baseURL: 'https://seu-app-no-render.onrender.com'
});

export default api;