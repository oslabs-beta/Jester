import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { setShowLogin, logout, setIsLoggedIn } from '../redux/reducers/userInfoSlice';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { Login } from './Login';
import { letterSpacing } from '@mui/system';
import { Route, Routes, Link } from 'react-router-dom';
import axios from 'axios';

const NavBar = () => {




  const dispatch = useAppDispatch();
  const open = useAppSelector((state) => state.userInfo.showLogin);
  const isLoggedIn = useAppSelector((state) => state.userInfo.isLoggedIn);
  const handleLoginOpen = () => {
    dispatch(setShowLogin());
  };
  const handleLogout = async () => {
  // logout button should clear out user info in state
    await axios.post('/auth/logout');
    dispatch(logout());
    dispatch(setIsLoggedIn());
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static'>
        <Toolbar>
          <Link to='/'>
            <img alt='logo' src='../assets/logo-jester.png' />
          </Link>
          <Typography
            variant='h6'
            component='div'
            sx={{ flexGrow: 1, marginLeft: '15px' }}
          ></Typography>
          <Button color='inherit'>
            <Link className='nav-link' to='/clipboard'>
              Clipboard
            </Link>
          </Button>
          <Button color='inherit'>
            <Link className='nav-link' to='/documentation'>
              Documentation
            </Link>
          </Button>
          <Button color='inherit' onClick={handleLoginOpen} sx={{display: isLoggedIn ? 'auto' : 'none'}}>
            Login
          </Button>
          <Button color='inherit' onClick={handleLogout} sx={{display: isLoggedIn ? 'none' : 'auto'}}>
            Logout
          </Button>
          <Login open={open} />
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;
