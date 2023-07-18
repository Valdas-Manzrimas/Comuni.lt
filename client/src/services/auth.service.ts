// services/authService.ts

export interface UserData {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  lastLoginIP: string;
  ipLocation: string;
}
const API_URL = 'http://localhost:5000/api/test/user';

export const isUserAuthenticated = async (): Promise<UserData | null> => {
  const token = localStorage.getItem('accessToken');

  if (!token) {
    return null;
  }

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `x-access-token ${token}`,
      },
    });

    if (response.ok) {
      const userData: UserData = await response.json();
      return userData;
    } else {
      localStorage.removeItem('accessToken');
      return null;
    }
  } catch (error) {
    console.error('Error validating token:', error);
    return null;
  }
};
