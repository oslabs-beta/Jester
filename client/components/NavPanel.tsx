import React, {useState} from 'react';
import HistoryIcon from '@mui/icons-material/History';
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';
import { Button, Typography, Box } from '@mui/material';
import { useAppDispatch } from '../redux/hooks';
import { setShowProjectPanel } from '../redux/reducers/navPanelSlice';

export const NavPanel = () => {
  const dispatch = useAppDispatch();
  const handleProjectsClick = () => {
    dispatch(setShowProjectPanel())
  }
  return (
    <Box sx={{display: 'flex', flexDirection: 'column', border: '1px dashed lightgrey'}}>
      <Button sx={{display: 'flex', flexDirection: 'column'}}>
        <HistoryIcon />
        <Typography sx={{fontSize: '10px'}}>History</Typography>
      </Button>
      <Button sx={{display: 'flex', flexDirection: 'column'}} onClick={ handleProjectsClick }>
        <CollectionsBookmarkIcon />
        <Typography sx={{fontSize: '10px'}}>Projects</Typography>
      </Button>
    </Box>
  );
};
