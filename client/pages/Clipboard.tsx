import React from 'react';
import Typography from '@mui/material/Typography';
import ClipBoard from '../components/ClipBoard';

const Clipboard = () => {
  return (
    <div className='page-body'>
      {/* <Typography variant='h4' component='h2'>
        This is the clipboard page.
      </Typography> */}
      <ClipBoard />
    </div>
  );
};

export default Clipboard;
