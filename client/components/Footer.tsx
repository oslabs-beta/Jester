import * as React from 'react';
import AppBar from '@mui/material/AppBar';
// import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
// import Box from '@mui/material/Box';
import { Box , Link, Typography } from '@mui/material/';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

type footerPropsType = {
 // no props currently
}

function Footer(props: footerPropsType) {
  return (
    <Box id="footer" sx={{
      py: 3,
      px: 2,
      mt: 'auto'
      }}>
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        jester-app.dev
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
    </Box>
  );
}

export default Footer;