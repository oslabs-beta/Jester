import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddBoxIcon from '@mui/icons-material/AddBox';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DoneAllIcon from '@mui/icons-material/DoneAll';

import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { appendToClipboard } from '../redux/reducers/ClipBoardReducers';

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
  const codeOutput = useAppSelector((state) => state.slice.codeOutputEdited || state.slice.codeOutput);
  const isLoggedIn = useAppSelector((state) => state.userInfo.isLoggedIn);

  const dispatch = useAppDispatch();
  const copyClipboard = () => {
    dispatch(copyText());
    dispatch(changeIcon());
    dispatch(asyncChangeIcon());
  };
  const appendClipboard = () => {
    if (!isLoggedIn) dispatch(appendToClipboard(codeOutput));
    else {
      // MLCK
      // will write after Lilah sets up the route
      // need to have some logic to perform a post request to the database
      // and a get request to update the clipboard
    }
  };
  

  return (
    <Box
      className='button-container'
      sx={{
        marginLeft: 5,
        marginTop: 2,
        display: 'flex',
        flexDirection: 'column',
        // justifyContent: 'flex-end',
        // alignItems: 'flex-end'
      }}
    >
      <Button 
        id='bttn-copy' 
        variant='outlined' 
        onClick={ copyClipboard }
        sx={{ marginBottom: 1 }}
      >
        {doneIcon ? <DoneAllIcon /> : <ContentCopyIcon />}
      </Button>
      <Button 
        id='bttn-append' 
        variant='outlined' 
        onClick = { appendClipboard }
        sx={{ marginBottom: 1 }}
      >
        <AddBoxIcon />
      </Button>
    </Box>
  );
};

export default ButtonContainer;
