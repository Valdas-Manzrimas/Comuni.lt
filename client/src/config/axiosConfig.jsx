// config/axiosConfig.js
import axios from 'axios';
import { setAccessToken, setCurrentUser } from '../store/features/userSlice';

const instance = axios.create({
  baseURL: 'http://localhost:8080',
});

export const axiosLogin = async (data, dispatch) => {
  try {
    const response = await instance.post('/api/auth/login', data);

    if (response.status === 200) {
      // Set the access token
      dispatch(setAccessToken(response.data.token));

      // Set the current user
      dispatch(setCurrentUser(response.data));
    }

    return response;
  } catch (error) {
    throw error;
  }
};

export default instance;
