// services/auth.service.ts

import axiosConfig from '../config/axiosConfig';

export interface UserData {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  lastLoginIP: string;
  ipLocation: string;
}

const API_URL = 'http://localhost:8080/api/user';

export const isUserAuthenticated = async (): Promise<UserData | null> => {
  const token = localStorage.getItem('x-access-token');

  if (!token) {
    return null;
  }

  try {
    const response = await axiosConfig.get(API_URL, {
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': `${token}`,
      },
    });

    if (response.status === 200) {
      return response.data as UserData;
    } else {
      throw new Error('Failed to fetch user data');
    }
  } catch (error: any) {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('x-access-token');
      throw new Error('User not authenticated');
    } else {
      console.error('Error validating token:', error);
      throw new Error('An error occurred during user authentication');
    }
  }
};

export const changePassword = async (
  id: string,
  currentPassword: string,
  newPassword: string
): Promise<void> => {
  const token = localStorage.getItem('x-access-token');

  if (!token) {
    throw new Error('User not authenticated');
  }

  try {
    const response = await axiosConfig.put(
      '/api/user/changePassword',
      {
        id,
        currentPassword,
        newPassword,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': `${token}`,
        },
      }
    );

    if (response.status === 200) {
      // Password changed successfully
      return;
    } else {
      throw new Error('Failed to change password');
    }
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Error changing password');
  }
};
