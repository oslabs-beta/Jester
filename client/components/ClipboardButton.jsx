import React from 'react';
import Box from '@mui/material/Box';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import { useDispatch } from 'react-redux';

import { copyClipboard } from '../redux/reducers/ClipBoardReducers';
import AppButton from '../components/AppButton';

// This container wraps the button that copies the app clipboard to the navigator clipboard

const ClipboardButton = () => {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(copyClipboard());
  };

  return (
    <Box
      className="clipboard-button-container"
      sx={{
        marginLeft: 5,
        marginTop: 2,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
      }}
    >
      <AppButton
        start={<ContentCopyIcon />}
        end={<DoneAllIcon />}
        onClick={handleClick}
        testId="bttn-copy"
      />
    </Box>
  );
};

export default ClipboardButton;
