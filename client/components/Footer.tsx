import * as React from 'react';
import { Box, Link, Typography } from '@mui/material/';

function Footer() {
  return (
    <Box
      id="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
      }}
    >
      <Typography variant="body2" color="text.secondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="https://jester.software">
          jester.software
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    </Box>
  );
}

export default Footer;
