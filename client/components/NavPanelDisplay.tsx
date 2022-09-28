import React, { useState } from 'react';
import HistoryIcon from '@mui/icons-material/History';
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';
import { Button, Typography, Box } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import {
  setShowProjectPanel,
  setShowHistoryPanel,
} from '../redux/reducers/navPanelSlice';

export const NavPanel = () => {
  const dispatch = useAppDispatch();
  const handleProjectsClick = () => {
    dispatch(setShowProjectPanel());
  };
  const handleHistoryClick = () => {
    dispatch(setShowHistoryPanel());
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
        sx={{ display: 'flex', flexDirection: 'column' }}
        onClick={handleHistoryClick}
      >
        <HistoryIcon />
        <Typography sx={{ fontSize: '10px' }}>History</Typography>
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
