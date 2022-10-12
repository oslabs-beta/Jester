import React from 'react';
import { useDispatch } from 'react-redux';

import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import Box from '@mui/material/Box';

import { copyClipboard } from '../redux/reducers/clipboardSlice';
import {AppButton} from './AppButton';

// This container wraps the button that copies the app clipboard to the navigator clipboard

export const ClipboardButton = () => {
  const dispatch = useDispatch();
  const handleClick = (): void => {
    dispatch(copyClipboard());
  };

  return (
    <Box
      className="clipboard-button-container"
      sx={{
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
      }}
    >
      <AppButton
        start={ <ContentCopyIcon /> }
        end={ <DoneAllIcon /> }
        onClick={ handleClick }
        testId="bttn-copy"
      />
    </Box>
  );
};
