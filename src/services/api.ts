// src/services/api.ts
import axios from 'axios';

const API_URL = 'http://grizzly.local/back/api/';  // Asegúrate de que esta URL coincide con tu backend

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Añadir un interceptor para incluir el token en las solicitudes
api.interceptors.request.use((config) => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  if (token && config.headers) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;
