import { useState } from 'react';
import { login } from '../../config/axiosConfig';
import { useForm, FieldErrors } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCurrentUser } from '../../store/features/userSlice';

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

  // Redux
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
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
    } catch (error) {
      setFormValidateError(
        error.response?.data?.message || 'An error occurred during signin.'
      );
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h1 className="text-center">Sign In</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email Address
              </label>
              <input
                type="email"
                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                id="email"
                {...register('email')}
              />
              {errors.email && (
                <div className="invalid-feedback">{errors.email.message}</div>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className={`form-control ${
                  errors.password ? 'is-invalid' : ''
                }`}
                id="password"
                {...register('password')}
              />
              {errors.password && (
                <div className="invalid-feedback">{errors.password.message}</div>
              )}
            </div>
            {formValidateError && (
              <p className="text-center text-danger font-weight-bold">
                {formValidateError}
              </p>
            )}
            <div className="d-grid gap-2">
              <button type="submit" className="btn btn-primary mt-3">
                Sign In
              </button>
            </div>
            <div className="text-center mt-3">
              <a href="/register">Don't have an account? Sign Up</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
