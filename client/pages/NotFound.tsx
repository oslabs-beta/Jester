import React from 'react';
import { Link } from 'react-router-dom';
import Typography from '@mui/material/Typography';

const NotFound = () => {
  return (
    <div className='center'>
      <Typography variant='h3'>
        404: Page Not Found. Click <Link to='/'>here</Link> to go Home.
      </Typography>
    </div>
  );
};

export default NotFound;
