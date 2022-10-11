import React from 'react';
import { Button, Box, Dialog, DialogTitle, Typography } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import { useAppDispatch } from '../redux/hooks';
import { setShowLogin } from '../redux/reducers/userInfoSlice';

type loginProps = {
  open: boolean;
};

// This component will allow user to login with github

export const Login = (props: loginProps) => {
  const dispatch = useAppDispatch();
  const handleClose = (): void => {
    dispatch(setShowLogin());
    sessionStorage.removeItem('clipboardData');
  };
  return (
    <Dialog onClose={handleClose} open={props.open}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          height: 230,
        }}
      >
        <Box
          sx={{
            width: 400,
            display: 'flex',
            flexDirection: 'row',
            backgroundColor: '#6e00bb',
            justifyContent: 'center',
          }}
        >
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
          <GitHubIcon />
          GitHub
        </Button>
        <Typography id="error-message" sx={{ display: 'none', color: 'red' }}>
          Error
        </Typography>
      </Box>
    </Dialog>
  );
};
