import React from 'react';
import { Box } from '@mui/material';
import { NavPanelContainer } from './NavPanelContainer';
import { CodeGenerator } from './CodeGenerator';
import Clipboard from './Clipboard';

const Home = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: '10px',
      }}
    >
      <NavPanelContainer />
      <div>
        <CodeGenerator show={true} />
        <Clipboard show={false} />
      </div>
    </Box>
  );
};

export default Home;
