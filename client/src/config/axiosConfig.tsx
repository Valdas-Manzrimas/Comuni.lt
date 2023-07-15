import axios, { AxiosInstance } from 'axios';

const instance: AxiosInstance = axios.create({
  baseURL: 'http://localhost:8080',
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers['x-access-token'] = token;
  }
  return config;
});

export const login = async (data: any) => {
  try {
    const response = await instance.post('/api/auth/login', data);
    if (response.status === 200) {
      const { token } = response.data;
      // Store the token in the localStorage
      localStorage.setItem('accessToken', token);
    }
    return response;
  } catch (error) {
    throw error;
  }
};

export default instance;
