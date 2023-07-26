// Settings.tsx

import { useEffect, useState } from 'react';
import { UserData, isUserAuthenticated } from '../../services/auth.service';
import { useAppSelector, RootState } from '../../store/store';
import {
  Button,
  CssBaseline,
  TextField,
  Link,
  Grid,
  Box,
  Typography,
  Container,
  createTheme,
  ThemeProvider,
  FormLabel,
} from '@mui/material';
import { changePassword } from '../../services/auth.service';

const Settings = () => {
  const currentUser = useAppSelector(
    (state: RootState) => state.user.currentUser
  );
  const [userData, setUserData] = useState<UserData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [changePasswordError, setChangePasswordError] = useState<string | null>(
    null
  );

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await isUserAuthenticated();

        if (!userData) {
          setError('User data not found.');
        } else {
          setUserData(userData);
        }
      } catch (error: any) {
        setError(error.message);
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setChangePasswordError("New password and confirm password don't match.");
      return;
    }

    try {
      await changePassword(currentUser.id, currentPassword, newPassword);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setChangePasswordError(null);
    } catch (error: any) {
      setChangePasswordError(error.message || 'Error changing password.');
    }
  };

  const theme = createTheme();

  return (
    <div>
      {userData ? (
        <>
          <div>{`First Name: ${userData.firstName}`}</div>
          <div>{`Last Name: ${userData.lastName}`}</div>
          <div>{`Last Login IP: ${userData.lastLoginIP}`}</div>
          <div>{`IP Location: ${userData.ipLocation}`}</div>
          <ThemeProvider theme={theme}>
            <Container component='main' maxWidth='xs'>
              <CssBaseline />
              <Box
                sx={{
                  marginTop: 8,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <Typography component='h1' variant='h5'>
                  Change Password
                </Typography>
                <Box
                  component='form'
                  noValidate
                  onSubmit={handleChangePassword}
                  sx={{ mt: 3 }}
                >
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        type='password'
                        label='Current Password'
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        type='password'
                        label='New Password'
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        type='password'
                        label='Confirm Password'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                    </Grid>
                  </Grid>
                  <FormLabel
                    error={!!changePasswordError}
                    sx={{
                      fontSize: 14,
                      fontWeight: 'bold',
                      width: '100%',
                      textAlign: 'center',
                    }}
                  >
                    {changePasswordError}
                  </FormLabel>
                  <Button
                    type='submit'
                    fullWidth
                    variant='contained'
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Change Password
                  </Button>
                </Box>
              </Box>
            </Container>
          </ThemeProvider>
        </>
      ) : (
        <div>Some error appeared</div>
      )}
    </div>
  );
};

export default Settings;
