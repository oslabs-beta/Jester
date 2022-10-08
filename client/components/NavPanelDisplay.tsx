import React from 'react';
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';
import { Button, Typography, Box } from '@mui/material';
import { useAppDispatch } from '../redux/hooks';
import { setShowProjectPanel } from '../redux/reducers/navPanelSlice';
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
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        border: '1px dashed lightgrey',
      }}
    >
      <Button
        onClick={handleHomeClick}
        sx={{ display: 'flex', flexDirection: 'column' }}
      >
        <HomeIcon />
        Home
      </Button>
      <Button
        sx={{ display: 'flex', flexDirection: 'column' }}
        onClick={handleProjectsClick}
      >
        <CollectionsBookmarkIcon />
        <Typography sx={{ fontSize: '10px' }}>Projects</Typography>
      </Button>
    </Box>
  );
};
