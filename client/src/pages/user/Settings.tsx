// Settings.tsx
import React, { useEffect, useState } from 'react';
import { UserData } from '../../services/auth.service';
import { useAppSelector, RootState } from '../../store/store';

const Settings = () => {
  const currentUser = useAppSelector(
    (state: RootState) => state.user.currentUser
  );
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('/api/test/user', {
          method: 'GET',
          headers: {
            Authorization: `x-access-token ${localStorage.getItem(
              'accessToken'
            )}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }

        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div>
      {userData ? (
        <>
          <div>{`First Name: ${userData.firstName}`}</div>
          <div>{`Last Name: ${userData.lastName}`}</div>
          <div>{`Last Login IP: ${userData.lastLoginIP}`}</div>
          <div>{`IP Location: ${userData.ipLocation}`}</div>
        </>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default Settings;
