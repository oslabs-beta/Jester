import axios from 'axios';
import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import AddBoxIcon from '@mui/icons-material/AddBox';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DoneAllIcon from '@mui/icons-material/DoneAll';

import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { appendToClipboard, postSnippet, getSnippets } from '../redux/reducers/ClipBoardReducers';
import AppButton from '../components/AppButton';

import {
  copyText,
  changeIcon,
  asyncChangeIcon
} from '../redux/reducers/reducer';

// This container wraps:
// 2) the button that copies the code to the clipboard
// 3) for the stretch feature, this container will have the button that appends the code to the consolidated clipboard

const ButtonContainer = () => {
  const doneIcon = useAppSelector((state) => state.slice.doneIcon);
  const codeOutput = useAppSelector(
    (state) => state.slice.codeOutputEdited || state.slice.codeOutput
  );
  const isLoggedIn = useAppSelector((state) => state.userInfo.isLoggedIn);
  // MLCK need to get from cookie instead
  const projectId = 0; // MLCK need to select from somewhere

  const dispatch = useAppDispatch();
  const copyClipboard = () => {
    dispatch(copyText());
    dispatch(changeIcon());
    dispatch(asyncChangeIcon());
  };
  const appendClipboard = async () => {
    if (!isLoggedIn) dispatch(appendToClipboard(codeOutput));
    else {
      dispatch(postSnippet(codeOutput));
      dispatch(getSnippets());
    }
  };

  return (
    <Box
      className="button-container"
      sx={{
        marginLeft: 5,
        marginTop: 2,
        display: 'flex',
        flexDirection: 'column'
        // justifyContent: 'flex-end',
        // alignItems: 'flex-end'
      }}
    >
      <Button
        data-testid="bttn-copy"
        variant="outlined"
        onClick={ copyClipboard }
        sx={{ marginBottom: 1 }}
      >
        {doneIcon ? <DoneAllIcon /> : <ContentCopyIcon />}
      </Button>

      <AppButton
        start={ <AddBoxIcon /> }
        end={ <DoneAllIcon /> }
        onClick={ appendClipboard }
        testId="bttn-append"
      />
    </Box>
  );
};

export default ButtonContainer;
