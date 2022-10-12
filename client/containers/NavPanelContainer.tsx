import React from 'react';

import Box from '@mui/material/Box';

import { NavPanelDisplay } from '../components/NavPanelDisplay';
import { ProjectPanelContainer } from './ProjectPanelContainer';

export const NavPanelContainer: any = () => {

  return (
    <Box sx={{ display: 'flex', flexDirection: 'row' }} >
      <NavPanelDisplay />
      <ProjectPanelContainer />
    </Box>
  );
};
