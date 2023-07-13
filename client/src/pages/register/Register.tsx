import {useState} from 'react';
import axiosConfig from '../../config/axiosConfig';

import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Box,
  Typography,
  Container,
  createTheme,
  ThemeProvider,
  FormLabel,
} from '@mui/material';

import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

const theme = createTheme();

export default function Register() {
  const [formValidateError, setFormValidateError] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const formData = {
      firstName: data.get('firstName'),
      lastName: data.get('lastName'),
      email: data.get('email'),
      password: data.get('password'),
    };

    try {
      const response = await axiosConfig.post('/api/auth/register', formData, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 201) {
        console.log('User registered successfully!');
        // Redirect or perform any desired action
      } else {
        const errorMessage = response.data.message;

        setFormValidateError(errorMessage)
        
        // Handle the error or display an error message to the user
      }
    } catch (error: any) {
      // console.error('Error registering user:', error.response.data.message);
      setFormValidateError(error.response.data.message)
      // Handle the error or display an error message to the user
    }
  };

  return (
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
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Sign up
          </Typography>
          <Box
            component='form'
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete='given-name'
                  name='firstName'
                  required
                  fullWidth
                  id='firstName'
                  label='First Name'
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id='lastName'
                  label='Last Name'
                  name='lastName'
                  autoComplete='family-name'
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id='email'
                  label='Email Address'
                  name='email'
                  autoComplete='email'
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name='password'
                  label='Password'
                  type='password'
                  id='password'
                />
              </Grid>
              <Grid container item xs={12} pt={0}>
                <FormLabel error={true} sx={{ fontSize: 14, fontWeight: 'bold', width: '100%', textAlign: 'center' }}>{formValidateError}</FormLabel>
                <FormControlLabel
                  sx={{ paddingTop: '1rem', margin: '0 0.25rem 0 1rem'}}
                  control={
                    <Checkbox value='allowExtraEmails' color='primary' />
                  }
                  label='I am interested in getting more information about this community project.'
                  
                />
              </Grid>
            </Grid>
            <Button
              type='submit'
              fullWidth
              variant='contained'
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent='flex-end'>
              <Grid item>
                <Link href='/login' variant='body2'>
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
