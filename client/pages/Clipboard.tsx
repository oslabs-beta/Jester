import React from 'react';
import Typography from '@mui/material/Typography';
import ClipBoard from '../components/ClipBoard';

const Clipboard = () => {
  return (
    <div className='center'>
      {/* <Typography variant='h3'>This is the clipboard page.</Typography> */}
      <ClipBoard />
    </div>
  );
};

export default Clipboard;
