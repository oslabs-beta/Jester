import React from 'react';
import Box from '@mui/material/Box';
import ButtonContainer from '../containers/ButtonContainer';

import CodeText from '../components/CodeText';

// This container wraps:
// 1) the text box with the code from server

const CodeContainer = (props) => {
  return (
    <div className='code-container'>
      <Box
        sx={{
          width: 800,
          marginTop: 5,
          marginLeft: 5,
          marginBotton: 1
        }}
      >
        <CodeText />
      </Box>
      <ButtonContainer />
    </div>
  );
};

export default CodeContainer;
