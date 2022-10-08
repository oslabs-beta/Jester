import React from 'react';
import { Box } from '@mui/material';
import { ProjectPanelContainer } from './ProjectPanelContainer';
import { NavPanelDisplay } from '../components/NavPanelDisplay';

export const NavPanelContainer: any = () => {

  return (
    <Box sx={{ display: 'flex', flexDirection: 'row' }} >
      <NavPanelDisplay />
      <ProjectPanelContainer />
    </Box>
  );
};
