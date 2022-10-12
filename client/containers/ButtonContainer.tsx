import React from 'react';
import AddBoxIcon from '@mui/icons-material/AddBox';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import Box from '@mui/material/Box';

import { AppButton } from '../components/AppButton';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { appendToClipboard, getSnippets, postSnippet } from '../redux/reducers/clipboardSlice';
import { copyText } from '../redux/reducers/codeSlice';

// This container wraps:
// 1) the button that copies the code to the navigator clipboard
// 2) the button that perform a post request to the consolidated app clipboard SQL DB with the code

export const ButtonContainer = () => {
  const codeOutput = useAppSelector((state) => state.code.codeOutput);
  const isLoggedIn = sessionStorage.getItem('isLoggedIn');
  const projectId = useAppSelector((state) => state.userInfo.currentProjectId);

  const dispatch = useAppDispatch();
  const copyClipboard = () => dispatch(copyText());

  const appendClipboard = () => {
    if (isLoggedIn) {
      dispatch(postSnippet({ projectId, codeOutput: [codeOutput] }));
      dispatch(getSnippets(projectId));
    } else {
      dispatch(appendToClipboard(codeOutput));
    }
  };

  return (
    <Box
      className="button-container"
      sx={{
        marginLeft: 5,
        marginTop: 2,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <AppButton
        start={<ContentCopyIcon />}
        end={<DoneAllIcon />}
        onClick= { copyClipboard }
        testId="bttn-copy"
      />
      <AppButton
        start={<AddBoxIcon />}
        end={<DoneAllIcon />}
        onClick={ appendClipboard }
        testId="bttn-append"
      />
    </Box>
  );
};
