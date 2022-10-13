import axios from 'axios';
import Cookies from 'js-cookie';
import * as React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { logout, setShowLogin } from '../redux/reducers/userInfoSlice';
import { Login } from './Login';

export const Navbar = () => {
  const navigate = useNavigate();
  const open: boolean = useAppSelector((state) => state.userInfo.showLogin);
  const clipboardData: string[] = useAppSelector((state) => state.clipboard.codeSnippets);
  const displayLoginButton = 'auto';
  const displayLogoutButton = 'auto';

  const dispatch = useAppDispatch();
  const handleLoginOpen = () => {
    dispatch(setShowLogin());
    if (clipboardData.length) sessionStorage.setItem('clipboardData', JSON.stringify(clipboardData));
  };
  const handleLogout = async () => {
    Cookies.remove('username');
    Cookies.remove('code');
    Cookies.remove('email');
    Cookies.remove('github-auth-session');
    Cookies.remove('github-auth-session.sig');
    Cookies.remove('isLoggedIn');
    sessionStorage.clear();
    await axios.post('/auth/logout');
    // clear projects and user information in state
    dispatch(logout()); 
    navigate('/');
  };

  return (
    <Box id="navbar" sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Link to="/">
            <img alt="logo" src="../assets/jester-logo-4.png" />
          </Link>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, marginLeft: '15px' }}
          ></Typography>
          {sessionStorage.getItem('isLoggedIn') ? (
            <Button className="welcome-text" color="inherit">
              Welcome, {sessionStorage.getItem('username')}!
            </Button>
          ) : (
            <Button className="welcome-text" color="inherit">
              Welcome, Guest!
            </Button>
          )}
          <Button color='inherit'>
            <Link className='nav-link' to='/contributors'>
              Contributors
            </Link>
          </Button>
          {sessionStorage.getItem('isLoggedIn') ? (
            <Button
              color="inherit"
              onClick={handleLogout}
              sx={{ display: displayLogoutButton }}
            >
              <LogoutIcon sx={{ marginRight: '5px', marginLeft: '5px' }} /> Logout
            </Button>
          ) : (
            <Button
              color="inherit"
              onClick={handleLoginOpen}
              sx={{ display: displayLoginButton }}
            >
              <LoginIcon sx={{ marginRight: '5px', marginLeft: '5px' }} />Login
            </Button>
          )}

          <Login open={open} />
        </Toolbar>
      </AppBar>
    </Box>
  );
};
