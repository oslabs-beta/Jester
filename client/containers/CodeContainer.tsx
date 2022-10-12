import React from 'react';
import Box from '@mui/material/Box';
import ButtonContainer from './ButtonContainer';
import CodeText from '../components/CodeText';

// This container wraps the text box containing the code from server

const CodeContainer = () => {
  return (
    <div>
      <Box className='test-code-box code-container'>
        <CodeText />
        <ButtonContainer />
      </Box>
    </div>
  );
};

export default CodeContainer;
