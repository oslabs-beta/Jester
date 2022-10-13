import axios from 'axios';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import IntegrationInstructionsIcon from '@mui/icons-material/IntegrationInstructions';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { clearClipboardState } from '../redux/reducers/clipboardSlice';
import { setProjectsInfo } from '../redux/reducers/userInfoSlice';

type navProjectMenuProps = {
  projectId: number;
};

/* 
This component enables navigation to each project's unique clipboard 
and gives a user the ability to delete any of their projects from the database.
*/

export const NavProjectMenu = (props: navProjectMenuProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isLoggedIn = sessionStorage.getItem('isLoggedIn');
  const projects = useAppSelector((state) => state.userInfo.projectsInfo);
  let show;
  for (const project of projects) {
    if (project.project_id === props.projectId) {
      show = project.showAccessClipboard;
    }
  }

  const handleClipboardClick = () => {
    if (isLoggedIn) navigate(`/clipboard/${props.projectId}`);
    // if not logged in, navigates to default clipboard in state
    else navigate('/clipboard/0'); 
  };

  const handleDeleteClick = async () => { 
    if (isLoggedIn) {
      const projects = await axios.delete(`/api/project/${props.projectId}`); 
      dispatch(setProjectsInfo(projects.data));
    } else { 
      dispatch(clearClipboardState());
    }
  };
  if (show)
    return (
      <Box>
        <Button
          onClick={handleClipboardClick}
          sx={{ display: 'flex', flexDirection: 'column' }}
        >
          <IntegrationInstructionsIcon />
          Clipboard
        </Button>
        <Button
          onClick={handleDeleteClick}
          sx={{
            display: isLoggedIn ? 'flex' : 'none',
            flexDirection: 'column',
          }}
        >
          <DeleteForeverIcon />
          Delete Project
        </Button>
        <Button
          onClick={handleDeleteClick}
          sx={{
            display: isLoggedIn ? 'none' : 'flex',
            flexDirection: 'column',
          }}
        >
          <DeleteForeverIcon />
          Clear Clipboard
        </Button>
      </Box>
    );
  else return null;
};
