import * as React from 'react';
// import { useDispatch } from 'react-redux';
import { logoutUser } from '../../../store/features/userSlice';
import {
  useAppSelector,
  useAppDispatch,
  RootState,
} from '../../../store/store';
import MenuIcon from '@mui/icons-material/Menu';
import AdbIcon from '@mui/icons-material/Adb';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Button,
  Tooltip,
  MenuItem,
} from '@mui/material/';
import { Link } from 'react-router-dom';

const pages = ['Community'];
const authPages = ['Register', 'Login'];
const settings = ['Profile', 'Account', 'Dashboard'];

function Navbar() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  // global state
  const currentUser = useAppSelector(
    (state: RootState) => state.user.currentUser
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const dispatch = useAppDispatch();
  const handleLogout = () => {
    dispatch(logoutUser());

    localStorage.removeItem('accessToken');
    handleCloseUserMenu();
    // Additional logout actions (e.g., redirect to login page)
  };

  return (
    <AppBar position='static'>
      <Container maxWidth='xl' sx={{ background: '#445566' }}>
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant='h6'
            noWrap
            component='a'
            href='/'
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size='large'
              aria-label='account of current user'
              aria-controls='menu-appbar'
              aria-haspopup='true'
              onClick={handleOpenNavMenu}
              color='inherit'
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id='menu-appbar'
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign='center'>{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant='h5'
            noWrap
            component='a'
            href=''
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: 'none', md: 'flex' },
            }}
          >
            {pages.map((page) => (
              <Button
                key={page}
                href={`/` + `${page.toLowerCase()}`}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            {currentUser && currentUser.email ? (
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  cursor: 'pointer',
                  position: 'relative',
                }}
                onClick={handleOpenUserMenu}
              >
                <Menu
                  id='menu-appbar'
                  anchorEl={anchorElUser}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                  onClick={(event) => event.stopPropagation()}
                >
                  {settings.map((setting) => (
                    <MenuItem key={setting}>
                      <Typography textAlign='center'>{setting}</Typography>
                    </MenuItem>
                  ))}
                  <MenuItem onClick={handleLogout}>
                    <Typography textAlign='center'>Logout</Typography>
                  </MenuItem>
                </Menu>
                <Tooltip title='Open settings'>
                  <IconButton
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      backgroundColor: 'transparent',
                      cursor: 'pointer',
                      '&:hover': {
                        backgroundColor: 'rgba(0, 0, 0, 0.04)',
                      },
                    }}
                  >
                    <Avatar
                      alt='Remy Sharp'
                      src='/static/images/avatar/2.jpg'
                    />
                  </IconButton>
                </Tooltip>
                <Typography ml={1}>{currentUser.firstName}</Typography>
              </Box>
            ) : (
              <>
                {authPages.map((authPage) => (
                  <Button
                    key={authPage}
                    component={Link}
                    to={`/${authPage.toLowerCase()}`}
                    color='inherit'
                  >
                    {authPage}
                  </Button>
                ))}
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
