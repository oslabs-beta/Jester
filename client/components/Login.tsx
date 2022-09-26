import React from 'react';
import { Button, Box, Dialog, DialogTitle, Typography } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import axios from 'axios'
import { useAppDispatch } from '../redux/hooks';
import { setShowLogin } from '../redux/reducers/userInfoSlice';
// import {setClipboard} from '../redux/reducers/clipboardSlice';

type loginProps = {
  open: boolean,
}

export const Login = (props: loginProps) => {
  const dispatch = useAppDispatch();
  const handleClose = (): void => {
    dispatch(setShowLogin());
  }
  const handleClick = async (): Promise<void> => {
   const response:(string | any) = await axios.get('/auth/github')
   if (response === 'Unknown Error') {
    const errorElement = document.getElementById('error-message')
    if (errorElement) errorElement.style.display = 'auto'
   } else {
    // does the userId come from a cookie?
    const clipboardData = await axios.get('/userID') //what endpoint??
    // set clipboardData in state
      //slice of state name clipboard
        // reducer called setClipboard
    
    
    // dispatch(setClipboard(clipboardData))
    handleClose(); // close login box

   }
   // what will the response be? 
  }
 return (
  <Dialog onClose={handleClose} open={props.open}>
    <Box sx={{
      backgroundColor: '#5E17EB'
    }}><img alt='logo' src='../assets/logo-jester.png' /></Box>
    <DialogTitle>sign in with</DialogTitle>
    <Button href='/auth/github'>
      <GitHubIcon onClick={handleClick} />
    </Button>
    <Typography id="error-message" sx={{display: 'none', color: 'red'}}>Error</Typography>
  </Dialog>
 )
}