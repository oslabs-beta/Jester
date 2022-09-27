import { Box, Button, Typography } from '@mui/material';
import React from 'react';
import { useAppSelector } from '../redux/hooks';

export const HistoryPanel = () => {
  const showHistoryPanel = useAppSelector(
    (state) => state.navPanel.showHistoryPanel
  );
  if (showHistoryPanel)
    return (
      <Box
        sx={{
          border: '1px dashed lightgrey',
          width: '100px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <Typography>History Coming Soon!</Typography>
      </Box>
    );
  else return null;
};
