//Login.tsx
import { useState } from 'react';
import { login } from '../../config/axiosConfig';
import { useForm, FieldErrors } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCurrentUser } from '../../store/features/userSlice';
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

const theme = createTheme();

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .required('Email is required')
    .email('Please enter a valid email address'),
  password: yup.string().required('Password is required'),
});

export default function Login() {
  const [formValidateError, setFormValidateError] = useState('');
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  //Redux
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const onSubmit = async (data: any) => {
    try {
      const response = await login(data);
      if (response.status === 200) {
        const { token, ...user } = response.data;
        localStorage.setItem('x-access-token', token);
        dispatch(
          setCurrentUser({
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
          })
        );

        navigate('/');
      } else {
        setFormValidateError('Unknown error occurred during signin.');
      }
    } catch (error: any) {
      setFormValidateError(
        error.response?.data?.message || 'An error occurred during signin.'
      );
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
          <Typography component='h1' variant='h5'>
            Sign In
          </Typography>
          <Box
            component='form'
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id='email'
                  label='Email Address'
                  autoComplete='email'
                  autoFocus
                  {...register('email')}
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
                  autoComplete='new-password'
                  {...register('password')}
                />
              </Grid>
            </Grid>
            <FormLabel
              error={!!formValidateError}
              sx={{
                fontSize: 14,
                fontWeight: 'bold',
                width: '100%',
                textAlign: 'center',
              }}
            >
              {formValidateError}
            </FormLabel>
            <Button
              type='submit'
              fullWidth
              variant='contained'
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container justifyContent='flex-end'>
              <Grid item>
                <Link href='/register' variant='body2'>
                  Don't have an account? Sign Up
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
