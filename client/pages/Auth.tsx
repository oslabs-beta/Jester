import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Cookies from 'js-cookie';
import axios from 'axios';
import { setProjectsInfo } from '../redux/reducers/userInfoSlice';
import { useAppDispatch } from '../redux/hooks';

const Auth = () => {
  const dispatch = useAppDispatch();
  // Using Hooks, can refactor to RTK
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  // const [email, setEmail] = useState('');
  const [timer, updateTimer] = useState(3);

  useEffect(() => {
    if (sessionStorage.getItem('isLoggedIn')) {
      navigate('/'); 
    } else {
      // check code against sessions DB and matching username before proceeding?

      // can retrieve userId here also
      const cookie_code = Cookies.get('code') || '';
      const cookie_username = Cookies.get('username') || '';
      const cookie_email = Cookies.get('email') || '';
      setUsername(cookie_username);
      // setEmail(cookie_email);
      sessionStorage.setItem('username', cookie_username);
      sessionStorage.setItem('email', cookie_email);
      sessionStorage.setItem('code', cookie_code);
      sessionStorage.setItem('isLoggedIn', 'true');
      startCountdown(2);
    }
  }, []);

  function startCountdown(seconds: number) {
    let counter = seconds;
      
    const interval = setInterval(() => {
      updateTimer(counter);
      counter--;
        
      if (counter < 0 ) {
        clearInterval(interval);
        navigate('/');
      }
    }, 1000);
  }

  return (
    
    <div className='page-body'>
      <Typography variant='h4' component='h4'>
        Hello, {username}!
      </Typography>
      <Typography variant='h6' component='h6'>
        Successfully logged in with Github. Redirecting you in {timer} seconds...
      </Typography>
    </div>
  );
};

export default Auth;
