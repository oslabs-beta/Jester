import React from 'react';
import { Box, Button } from '@mui/material';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { useNavigate } from 'react-router-dom';
import { setProjectsInfo } from '../redux/reducers/userInfoSlice';
import axios from 'axios';
import IntegrationInstructionsIcon from '@mui/icons-material/IntegrationInstructions';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { clearCodeSnippets } from "../redux/reducers/ClipBoardReducers";


type accessClipboardDisplayProps = {
  projectId: number,
}
export const AccessClipboardDisplay = (props: accessClipboardDisplayProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector((state) => state.userInfo.isLoggedIn)
  const projects = useAppSelector((state) => state.userInfo.projectsInfo);
  let show;
  for (const project of projects) {
    if (project.project_id === props.projectId) {
      show = project.showAccessClipboard;
    }
  }

  const handleClipboardClick = () => {
    if(sessionStorage.getItem('isLoggedIn')) navigate(`/clipboard/${props.projectId}`);
    else navigate('/clipboard/0');
  };

  const handleDeleteClick = async () => {
    if (sessionStorage.getItem('isLoggedIn')) {
      // SA - TEMPORARY COMMENT-OUT
      const projects = await axios.delete(`/api/project/${props.projectId}`);
      dispatch(setProjectsInfo(projects.data));
    } else {
      dispatch(clearCodeSnippets());
    }
  };
  if (show) return(
    <Box>
      <Button onClick={handleClipboardClick} sx={{display: 'flex', flexDirection: 'column'}}>
        <IntegrationInstructionsIcon />
        Clipboard
      </Button>
      <Button onClick={handleDeleteClick} sx={{display: sessionStorage.getItem('isLoggedIn') ? 'flex' : 'none', flexDirection: 'column'}}>
        <DeleteForeverIcon />
        Delete Project
      </Button>
      <Button onClick={handleDeleteClick} sx={{display: sessionStorage.getItem('isLoggedIn') ? 'none' : 'flex', flexDirection: 'column'}}>
        <DeleteForeverIcon />
        Clear Clipboard
      </Button>
    </Box>
  );
  else return null;
};