import React from 'react';
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';
import ArticleIcon from '@mui/icons-material/Article';
import { Button, Typography, Box } from '@mui/material';
import { useAppDispatch} from '../redux/hooks';
import {
  setShowProjectPanel,
} from '../redux/reducers/navPanelSlice';
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from 'react-router-dom';

export const NavPanelDisplay = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleProjectsClick = () => {
    dispatch(setShowProjectPanel());
  };

  const handleHomeClick = () => {
    navigate('/');
  };
  const handleDocumentationClick = () => {
    navigate('/documentation');
  };
  return (
    <Box
    className="panel nav-panel-container"
      sx={{
        display: 'flex',
        flexDirection: 'column',

      }}
    >
      <Button onClick={handleHomeClick} sx={{display: 'flex', flexDirection:'column'}}><HomeIcon />Home</Button>
      <Button
        sx={{ display: 'flex', flexDirection: 'column' }}
        onClick={handleProjectsClick}
      >
        <CollectionsBookmarkIcon />
        <Typography sx={{ fontSize: '10px' }}>Projects</Typography>
      </Button>
      <Button onClick={handleDocumentationClick} sx={{display: 'flex', flexDirection:'column'}}><ArticleIcon />Docs</Button>
    </Box>
  );
};
