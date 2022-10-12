import React from 'react';
import { Link } from 'react-router-dom';
import { Typography } from '@mui/material';

export const NotFound = () => {
  return (
    <div className='page-body'>
      <Typography variant='h4' component='h2'>
        404: Page Not Found. Click <Link to='/'>here</Link> to go Home.
      </Typography>
    </div>
  );
};
