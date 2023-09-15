import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8080',
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('x-access-token');
  if (token) {
    config.headers['x-access-token'] = `${token}`;
  }
  return config;
});

export const login = async (data) => {
  try {
    const response = await instance.post('/api/auth/login', data);
    if (response.status === 200) {
      const { token } = response.data;
      localStorage.setItem('x-access-token', `${token}`);
    }
    return response;
  } catch (error) {
    throw error;
  }
};

export default instance;
