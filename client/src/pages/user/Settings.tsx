// Settings.tsx
import React, { useEffect, useState } from 'react';
import UserService from '../../services/user.service';
import { UserData, isUserAuthenticated } from '../../services/auth.service';
import { useAppSelector, RootState } from '../../store/store';

const Settings = () => {
  const currentUser = useAppSelector(
    (state: RootState) => state.user.currentUser
  );
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await isUserAuthenticated();

        if (!userData) {
          throw new Error('Failed to fetch user data');
        }

        setUserData(userData);
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
