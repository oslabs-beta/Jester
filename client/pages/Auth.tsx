import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography } from '@mui/material';
import Cookies from 'js-cookie';
import Box  from '@mui/material/Box';

/*
This component will provide a loading page for the user upon github verification in order to 
gather user information from cookies and set values in sessionStorage.
*/

export const Auth = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [timer, updateTimer] = useState(3);

  useEffect(() => {
    if (sessionStorage.getItem('isLoggedIn')) {
      navigate('/');
    } else {
      const cookie_code = Cookies.get('code') || '';
      const cookie_username = Cookies.get('username') || '';
      const cookie_email = Cookies.get('email') || '';
      setUsername(cookie_username);
      sessionStorage.removeItem('codeSnippets');
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

      if (counter < 0) {
        clearInterval(interval);
        navigate('/');
      }
    }, 1000);
  }

  return (

    <div className='page-body'>
      <Box sx={{ display: 'flex', flexDirection: 'column', textAlign: 'center' }}>
        <Typography variant='h4' component='h4'>
        Hello, {username}!
        </Typography>
        <Typography variant='h6' component='h6'>
        Successfully logged in with Github. Redirecting you in {timer} seconds...
        </Typography>
      </Box>
    </div>
  );
};
