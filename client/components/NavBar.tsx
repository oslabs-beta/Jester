import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import {
  setShowLogin,
  logout
} from '../redux/reducers/userInfoSlice';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { Login } from './Login';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';

const NavBar = () => {
  const navigate = useNavigate();
  const open: boolean = useAppSelector((state) => state.userInfo.showLogin);
  const clipboardData: string[] = useAppSelector((state) => state.clipboard.codeSnippets);
  const displayLoginButton = 'auto';
  const displayLogoutButton = 'auto';

  const dispatch = useAppDispatch();
  const handleLoginOpen = () => {
    sessionStorage.setItem('clipboardData', JSON.stringify(clipboardData));
    dispatch(setShowLogin());
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
    // why use 'post' here with no body? is this just a get request?
    dispatch(logout());
    navigate('/');
  };

  return (
    <Box id="navbar" sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Link to="/">
            <img alt="logo" src="../assets/logo-jester.png" />
          </Link>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, marginLeft: '15px' }}
          ></Typography>
          {sessionStorage.getItem('isLoggedIn') ? (
            <Button className='welcome-text' color='inherit'>
              Welcome, {sessionStorage.getItem('username')}!
            </Button>
          ) : (
            <Button className='welcome-text' color='inherit'>
              Welcome, Guest!
            </Button>
          )}
          {sessionStorage.getItem('isLoggedIn') ? (
            <Button
              color='inherit'
              onClick={handleLogout}
              sx={{ display: displayLogoutButton }}
            >
              <LogoutIcon sx={{marginRight: '5px', marginLeft: '5px'}} /> Logout
            </Button>
          ) : (
            <Button
              color='inherit'
              onClick={handleLoginOpen}
              sx={{ display: displayLoginButton }}
            >
              <LoginIcon sx={{marginRight: '5px', marginLeft: '5px'}} />Login
            </Button>
          )}

          <Login open={open} />
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;
