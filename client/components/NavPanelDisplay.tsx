import React from 'react';
import { useNavigate } from 'react-router-dom';

import ArticleIcon from '@mui/icons-material/Article';
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';
import HomeIcon from '@mui/icons-material/Home';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { useAppDispatch } from '../redux/hooks';
import { setShowProjectPanel } from '../redux/reducers/navPanelSlice';

/*
This component wraps buttons for user to navigate to home page, to documentation page,
and to view their projects in the nav panel
*/

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
        width: '100px',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Button 
        onClick={handleHomeClick} 
        sx={{ 
          display: 'flex', 
          flexDirection:'column', 
          marginBottom:2 
        }}>
        <HomeIcon sx={{ scale: '117%' }} />
        <Typography sx={{ fontSize: '12px' }}>Home</Typography>
      </Button>
      <Button
        sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          marginBottom:2 
        }}
        onClick={handleProjectsClick}
      >
        <CollectionsBookmarkIcon />
        <Typography sx={{ fontSize: '12px' }}>Projects</Typography>
      </Button>
      <Button 
        onClick={handleDocumentationClick} 
        sx={{ 
          display: 'flex', 
          flexDirection:'column', 
          marginBottom:2 
        }}>
        <ArticleIcon />
        <Typography sx={{ fontSize: '12px' }}>Docs</Typography>
      </Button>
    </Box>
  );
};
