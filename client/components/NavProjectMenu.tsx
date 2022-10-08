import React from 'react';
import { Box, Button } from '@mui/material';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { useNavigate } from 'react-router-dom';
import { setProjectsInfo } from '../redux/reducers/userInfoSlice';
import axios from 'axios';
import IntegrationInstructionsIcon from '@mui/icons-material/IntegrationInstructions';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { clearClipboardState } from '../redux/reducers/ClipBoardReducers';

type navProjectMenuProps = {
  projectId: number;
};

// This component enables navigation to each projects clipboard and gives user the ability to delete project from db.
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
    else navigate('/clipboard/0'); // if not logged in, navigates to default clipboard in state
  };

  const handleDeleteClick = async () => { // deletes project from DB and updates state if user logged in
    if (isLoggedIn) {
      const projects = await axios.delete(`/api/project/${props.projectId}`); 
      dispatch(setProjectsInfo(projects.data));
    } else { // deleted clipboard data in state if user not logged in
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
