import { useState } from 'react';
import axiosConfig from '../../config/axiosConfig';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import userSlice, {
  addUser,
  setCurrentUser,
} from '../../store/features/userSlice';
import { store, useAppDispatch } from '../../store/store';

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

const theme = createTheme();

const validationSchema = yup.object().shape({
  firstName: yup.string().required('First Name is required'),
  lastName: yup.string().required('Last Name is required'),
  email: yup
    .string()
    .required('Email is required')
    .email('Please enter a valid email address'),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters'),
});

export default function Register() {
  const [formValidateError, setFormValidateError] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  //Redux
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const onSubmit = async (data: any) => {
    try {
      const response = await axiosConfig.post('/api/auth/register', data, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 201) {
        console.log('User registered successfully!');
        const { id, firstName, lastName, email, token } = response.data;

        dispatch(
          setCurrentUser({
            id,
            firstName,
            lastName,
            email,
          })
        );

        dispatch(
          addUser({
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
          })
        );

        console.log('Updated User State:', store.getState().user.currentUser);
        localStorage.setItem('accessToken', token);
        navigate('/');
      } else {
        const errorMessage = response.data.message;
        setFormValidateError(errorMessage);
        // Handle the error or display an error message to the user
      }
    } catch (error: any) {
      console.error('Error registering user:', error);
      setFormValidateError(
        error.response?.data?.message || 'An error occurred'
      );
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
            onSubmit={handleSubmit(onSubmit)}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete='given-name'
                  // name='firstName'
                  required
                  fullWidth
                  id='firstName'
                  label='First Name'
                  autoFocus
                  {...register('firstName')}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id='lastName'
                  label='Last Name'
                  // name='lastName'
                  autoComplete='family-name'
                  {...register('lastName')}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id='email'
                  label='Email Address'
                  // name='email'
                  autoComplete='email'
                  {...register('email')}
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  // name='password'
                  label='Password'
                  type='password'
                  id='password'
                  {...register('password')}
                  error={!!errors.password}
                  helperText={errors.password?.message}
                />
              </Grid>
              <Grid container item xs={12} pt={0}>
                <FormLabel
                  error={true}
                  sx={{
                    fontSize: 14,
                    fontWeight: 'bold',
                    width: '100%',
                    textAlign: 'center',
                  }}
                >
                  {formValidateError}
                </FormLabel>
                <FormControlLabel
                  sx={{ paddingTop: '1rem', margin: '0 0.25rem 0 1rem' }}
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
