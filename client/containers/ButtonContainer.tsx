import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddBoxIcon from '@mui/icons-material/AddBox';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DoneAllIcon from '@mui/icons-material/DoneAll';

import { useAppDispatch, useAppSelector } from '../redux/hooks';
import {
  appendToClipboard,
  postSnippet,
  getSnippets,
} from '../redux/reducers/ClipBoardReducers';
import AppButton from '../components/AppButton';

import {
  copyText,
  changeIcon,
  asyncChangeIcon,
} from '../redux/reducers/reducer';

// This container wraps:
// 1) the button that copies the code to the navigator clipboard
// 2) the button that perform a post request to the consolidated app clipboard SQL DB with the code

const ButtonContainer = () => {
  const doneIcon = useAppSelector((state) => state.slice.doneIcon);
  const codeOutput = useAppSelector(
    (state) => state.slice.codeOutputEdited || state.slice.codeOutput
  );
  const isLoggedIn = sessionStorage.getItem('isLoggedIn');
  const projectId = useAppSelector((state) => state.userInfo.currentProjectId);

  const dispatch = useAppDispatch();
  const copyClipboard = () => {
    dispatch(copyText());
    dispatch(changeIcon());
    dispatch(asyncChangeIcon());
  };

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
      <Button
        data-testid="bttn-copy"
        variant="outlined"
        onClick={copyClipboard}
        sx={{ marginBottom: 1 }}
      >
        {doneIcon ? <DoneAllIcon /> : <ContentCopyIcon />}
      </Button>

      <AppButton
        start={<AddBoxIcon />}
        end={<DoneAllIcon />}
        onClick={appendClipboard}
        testId="bttn-append"
      />
    </Box>
  );
};

export default ButtonContainer;
