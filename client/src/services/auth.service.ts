// services/auth.service.ts

export interface UserData {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  lastLoginIP: string;
  ipLocation: string;
}
const API_URL = 'http://localhost:8080/api/test/user';

export const isUserAuthenticated = async (): Promise<UserData | null> => {
  const token = localStorage.getItem('x-access-token');

  if (!token) {
    return null;
  }

  try {
    const response = await fetch(API_URL, {
      method: 'GET', 
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const userData: UserData = await response.json();
      return userData;
    } else {
      localStorage.removeItem('x-access-token');
      return null;
    }
  } catch (error) {
    console.error('Error validating token:', error);
    return null;
  }
};
