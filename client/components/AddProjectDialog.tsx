import axios from 'axios';
import React, { ChangeEvent, useState } from 'react';

import LoginIcon from '@mui/icons-material/Login';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';

import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { setShowAddProject } from '../redux/reducers/navPanelSlice';
import { setProjectsInfo, setShowLogin } from '../redux/reducers/userInfoSlice';
import { Login } from './Login';

/* 
This component will allow a user to create a new project in the database
where generated test code snippets will be stored.
If a user is not logged in, they will be prompted to login before they can create a project.
*/

export const AddProjectDialog = () => {
  const [projectName, setProjectName] = useState('');
  const showAddProject = useAppSelector(
    (state) => state.navPanel.showAddProject
  );
  const open: boolean = useAppSelector((state) => state.userInfo.showLogin);
  const clipboardData = useAppSelector((state) => state.clipboard.codeSnippets);
  const dispatch = useAppDispatch();
  const handleClose = () => {
    dispatch(setShowAddProject());
  };
  const handleAddProject = async () => { 
    const response = await axios.post('api/project/', {
      project_name: projectName,
    });
    dispatch(setProjectsInfo(response.data));
    handleClose();
  };

  const updateProjectName = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setProjectName(e.target.value);
  };

  const handleLoginOpen = async () => {
    handleClose();
    dispatch(setShowLogin());
    if (clipboardData.length) sessionStorage.setItem('clipboardData', JSON.stringify(clipboardData));
  };

  if (sessionStorage.getItem('isLoggedIn'))
    return (
      <Dialog onClose={handleClose} open={showAddProject} sx={{ display: 'flex', flexDirection: 'column', textAlign: 'center' }}>
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
        <DialogTitle>Add a Project</DialogTitle>
        <TextField
          label="Project Name:"
          onChange={updateProjectName}
          sx={{ width: '250px', alignSelf: 'center', marginBottom: '10px' }}
        ></TextField>
        <Button onClick={handleAddProject}>Create Project</Button>
      </Dialog>
    );
  else
    return (
      <Dialog onClose={handleClose} open={showAddProject} sx={{ display: 'flex', flexDirection: 'column', textAlign: 'center' }}>
        <Box
          sx={{
            width: 410,
            display: 'flex',
            flexDirection: 'row',
            backgroundColor: '#6e00bb',
            justifyContent: 'center',
          }}
        >
          <img alt="logo" src="../assets/logo-jester.png" />
        </Box>
        <DialogTitle>To add a project, you must be logged in!</DialogTitle>
        <Button
          onClick={handleLoginOpen}
          variant="outlined"
          size="large"
          sx={{
            margin: 2,
            width: '250px',
            alignSelf: 'center',
          }}
        >
          <LoginIcon sx={{ marginRight: '5px', marginLeft: '5px' }} />Login
        </Button>
        <Login open={open} />
      </Dialog>
    );
};
