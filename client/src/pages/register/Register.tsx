import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosConfig from '../../config/axiosConfig';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
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

const validationSchema = yup.object().shape({
  firstName: yup.string().required('First Name is required'),
  lastName: yup.string().required('Last Name is required'),
  email: yup
    .string()
    .required('Email is required')
    // .email('Please enter a valid email address')
    .matches(
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      'Please enter a valid email address'
    ),
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

  const navigate = useNavigate();

  const handleFormSubmit = async (data: any) => {
    try {
      const response = await axiosConfig.post('/api/auth/register', data, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 201) {
        console.log('User registered successfully!');
        reset();
        navigate('/');
        // Redirect or perform any desired action
      } else {
        const errorMessage = response.data.message;
        setFormValidateError(errorMessage);
        reset();
        // Handle the error or display an error message to the user
      }
    } catch (error: any) {
      console.error('Error registering user:', error.response.data.message);
      setFormValidateError(error.response?.data?.message);
      reset();
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
            onSubmit={handleSubmit(handleFormSubmit)}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  {...register('firstName')}
                  required
                  fullWidth
                  id='firstName'
                  label='First Name'
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  {...register('lastName')}
                  required
                  fullWidth
                  id='lastName'
                  label='Last Name'
                  autoComplete='family-name'
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  {...register('email')}
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  required
                  fullWidth
                  id='email'
                  label='Email Address'
                  autoComplete='email'
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  {...register('password')}
                  error={!!errors.password}
                  helperText={errors.password?.message}
                  required
                  fullWidth
                  name='password'
                  label='Password'
                  type='password'
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
