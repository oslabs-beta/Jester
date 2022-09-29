import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Cookies from 'js-cookie';
import axios from 'axios';
import { setIsLoggedIn, setProjectsInfo } from '../redux/reducers/userInfoSlice';
import { useAppDispatch } from '../redux/hooks';

const Auth = () => {
  const dispatch = useAppDispatch();
  // Using Hooks, can refactor to RTK
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    // check code against sessions DB and matching username before proceeding?

    // can retrieve userId here also
    const cookie_code = Cookies.get('code') || '';
    const cookie_username = Cookies.get('username') || '';
    const cookie_email = Cookies.get('email') || '';
    setUsername(cookie_username);
    setEmail(cookie_email);
    sessionStorage.setItem('username', cookie_username);
    sessionStorage.setItem('email', cookie_email);
    sessionStorage.setItem('code', cookie_code);
    sessionStorage.setItem('isLoggedIn', 'true');
    dispatch(setIsLoggedIn());
    axios.get(`/api/project/1`).then((res) => dispatch(setProjectsInfo(res.data)));

    setTimeout(() => {
      navigate('/');
    }, 3000);
  }, []);

  return (
    <div className='page-body'>
      <Typography variant='h4' component='h2'>
        Hello {username} ({email}).
      </Typography>
      <Typography variant='h4' component='h2'>
        Successfully logged in with Github. Redirecting you in 3 seconds...
      </Typography>
    </div>
  );
};

export default Auth;
