// axiosConfig.tsx
import axios, { AxiosInstance } from 'axios';

const instance: AxiosInstance = axios.create({
  baseURL: 'http://localhost:8080',
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('x-access-token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  console.log('Request headers:', config.headers); // Add this line to check the headers
  return config;
});

export const login = async (data: any) => {
  try {
    const response = await instance.post('/api/auth/login', data);
    if (response.status === 200) {
      const { token } = response.data;
      console.log('Received token:', token); // Add this line to check the token
      localStorage.setItem('x-access-token', token);
    }
    return response;
  } catch (error) {
    throw error;
  }
};

export default instance;
