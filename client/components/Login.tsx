import axios from 'axios';
import React from 'react';
import { Button, Box, Dialog, DialogTitle, Typography } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';

import { useAppDispatch } from '../redux/hooks';
import { setShowLogin, setIsLoggedIn } from '../redux/reducers/userInfoSlice';
// import {setClipboard} from '../redux/reducers/clipboardSlice';

type loginProps = {
  open: boolean,
}

export const Login = (props: loginProps) => {
  const dispatch = useAppDispatch();
  const handleClose = (): void => {
    dispatch(setShowLogin());
  };
  const handleClick = async (): Promise<void> => {
    const response:(string | any) = await axios.get('/auth/github');
    if (response === 'Unknown Error') {
      const errorElement = document.getElementById('error-message');
      if (errorElement) errorElement.style.display = 'auto';
    } else {
    // does the userId come from a cookie?
    // const clipboardData = await axios.get('/userID') //what endpoint??
    // set clipboardData in state
      // slice of state name clipboard
      // reducer called setClipboard
    
    
      // dispatch(setClipboard(clipboardData))
      dispatch(setIsLoggedIn());
      handleClose(); // close login box

    }
    // what will the response be? 
  };
  return (
    <Dialog 
      onClose={ handleClose } 
      open={props.open}
    >
      <Box sx={{
        display: 'flex',
        flexDirection: 'column', 
        alignItems: 'center',
        height: 230
      }}>
        <Box sx={{
          width: 400,
          display: 'flex',
          flexDirection: 'row', 
          backgroundColor: '#5E17EB',
          justifyContent: 'center'
        }}>
          <img alt="logo" src="../assets/logo-jester.png" />
        </Box>
        <DialogTitle>Log in to your account</DialogTitle>
        <Button 
          variant="outlined" 
          href="/auth/github"
          size="large"
          sx={{
            margin: 2,
          }}
        >
          <GitHubIcon onClick={ handleClick } />
            GitHub
        </Button>
        <Typography id="error-message" sx={{display: 'none', color: 'red'}}>Error</Typography>
      </Box>
    </Dialog>
  );
};