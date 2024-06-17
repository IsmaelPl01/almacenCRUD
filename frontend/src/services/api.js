import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5002/api', 
});

api.interceptors.request.use(config => {
  console.log('Request made with ', config);
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => {
  console.log('Error in request ', error);
  return Promise.reject(error);
});

api.interceptors.response.use(response => {
  console.log('Response received ', response);
  return response;
}, error => {
  console.log('Error in response ', error);
  return Promise.reject(error);
});

export default api;
