import { Box, Button, Typography } from '@mui/material';
import React from 'react';
import { useAppSelector } from '../redux/hooks';

export const ProjectPanel = () => {
  const showProjectPanel = useAppSelector(
    (state) => state.navPanel.showProjectPanel
  );
  if (showProjectPanel)
    return (
      <Box
        sx={{
          border: '1px dashed lightgrey',
          width: '100px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        Project1
        <Button>Add New Project</Button>
      </Box>
    );
  else return null;
};
