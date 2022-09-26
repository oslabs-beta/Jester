import React from 'react';
import { Header } from '../components/Header';
import CodeContainer from '../containers/CodeContainer';
import ButtonContainer from '../containers/ButtonContainer';
import { Box } from '@mui/material';
import { NavPanelContainer } from './NavPanelContainer';

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
        <Header />
        <CodeContainer />
        <ButtonContainer />
      </div>
    </Box>
  );
};

export default Home;
