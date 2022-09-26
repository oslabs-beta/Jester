import { Box } from '@mui/material';
import React from 'react';
import { useAppSelector } from '../redux/hooks';

export const ProjectPanel = () => {
  // links to navigate to the project pages
  const showProjectPanel = useAppSelector(
    (state) => state.navPanel.showProjectPanel
  );
  if (showProjectPanel)
    return (
      <Box sx={{ border: '1px dashed lightgrey', width: '100px' }}>
        Project1
      </Box>
    );
  else return null;
};
