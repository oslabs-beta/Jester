import React from 'react';
import { Button, Box, Dialog, DialogTitle, Typography } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import axios from 'axios'
import { useAppDispatch } from '../redux/hooks';
import { setShowLogin, setProjectsInfo, setIsLoggedIn } from '../redux/reducers/userInfoSlice';

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
    const userInfo = await axios.get('/auth');
    const userId = userInfo.data.user_id; // is this how userId is returned?
    const projectData = await axios.get(`/api/project/${userId}`) 
    dispatch(setProjectsInfo(projectData.data));
    // projects = [{project_id: num, project_name: 'string', user_id: num}]
    dispatch(setIsLoggedIn());
    handleClose();
   }
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