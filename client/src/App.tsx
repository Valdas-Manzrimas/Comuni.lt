// App.tsx
import { ReactElement, useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css'
import Home from './pages/home/Home';
import Login from './pages/authentication/Login';
import Register from './pages/authentication/Register';
import Navbar from './components/base/navbar';
import AuthRequired from './components/base/alerts/AuthRequired';
import { CssBaseline } from '@mui/material';
import Settings from './pages/user/Settings';
import { isUserAuthenticated, UserData } from './services/auth.service';
import { useAppSelector, useAppDispatch, RootState } from './store/store';
import PrivateRoute, {
  PrivateRouteProps,
} from './components/base/routing/PrivateRoute';

const App = (): ReactElement => {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  const currentUser = useAppSelector(
    (state: RootState) => state.user.currentUser
  );

  useEffect(() => {
    const checkAuthentication = async () => {
      const userData = await isUserAuthenticated();
      setUser(userData);
      setLoading(false);
    };
    checkAuthentication();
  }, []);

  const defaultPrivateRouteProps: Omit<PrivateRouteProps, 'outlet'> = {
    isAuthenticated: !!currentUser,
    authenticationPath: '/authRequired',
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='App' >
      <CssBaseline />
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        {!currentUser && (
          <Route path='/authRequired' element={<AuthRequired />} />
        )}
        <Route
          path='/settings'
          element={
            <PrivateRoute {...defaultPrivateRouteProps} outlet={<Settings />} />
          }
        />
      </Routes>
    </div>
  );
};

export default App;
