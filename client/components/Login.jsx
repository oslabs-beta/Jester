import React from 'react';
import { Box, Dialog, DialogTitle } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux';
import { setShowLogin } from '../redux/reducers/userInfoSlice';


export const Login = (props) => {
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(setShowLogin());
  }
  const handleClick = async () => {
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