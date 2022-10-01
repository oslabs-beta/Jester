import React, { useState, ChangeEvent } from 'react';
import {
  Dialog,
  TextField,
  Button,
  Typography,
} from '@mui/material';
import { setShowAddProject } from '../redux/reducers/navPanelSlice';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { setProjectsInfo } from '../redux/reducers/userInfoSlice';
import axios from 'axios';

export const AddProjectDialog = () => {
  const [projectName, setProjectName] = useState('');
  const userId = useAppSelector((state) => state.userInfo.userId);
  const showAddProject = useAppSelector(
    (state) => state.navPanel.showAddProject
  );
  const isLoggedIn = useAppSelector((state) => state.userInfo.isLoggedIn);
  const dispatch = useAppDispatch();
  const handleClose = () => {
    dispatch(setShowAddProject());
  };
  const handleAddProject = async () => {
    // SA - TEMPORARY COMMENT-OUT
    // const response = await axios.post(`/api/project/${userId}`, {
    //   project_name: projectName,
    // });
    // console.log(response.data);
    // dispatch(setProjectsInfo(response.data));
    handleClose();
  };

  const updateProjectName = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setProjectName(e.target.value);
  };

  if (sessionStorage.getItem('isLoggedIn'))
    return (
      <Dialog onClose={handleClose} open={showAddProject}>
        <TextField
          label="Project Name:"
          onChange={updateProjectName}
        ></TextField>
        <Button onClick={handleAddProject}>Create Project</Button>
      </Dialog>
    );
  else
    return (
      <Dialog onClose={handleClose} open={showAddProject}>
        <Typography> To add a project, you must be logged in!</Typography>
      </Dialog>
    );
};
