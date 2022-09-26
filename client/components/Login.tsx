import React from 'react';
import { Box, Dialog, DialogTitle } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import axios from 'axios'
import { useAppDispatch } from '../redux/hooks';
import { setShowLogin } from '../redux/reducers/userInfoSlice';

type loginProps = {
  open: boolean,
}

export const Login = (props: loginProps) => {
  const dispatch = useAppDispatch();
  const handleClose = (): void => {
    dispatch(setShowLogin());
  }
  const handleClick = async (): Promise<void> => {
   const response = await axios.get('/auth/github')
   // what will the response be? 
  }
 return (
  <Dialog onClose={handleClose} open={props.open}>
    <Box sx={{
      backgroundColor: '#5E17EB'
    }}><img alt='logo' src='../assets/logo-jester.png' /></Box>
    <DialogTitle>sign in with</DialogTitle>
    <GitHubIcon onClick={handleClick}/>
  </Dialog>
 )
}