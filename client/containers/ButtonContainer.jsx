import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import { useSelector, useDispatch } from 'react-redux';

import {
  copyText,
  changeIcon,
  asyncChangeIcon
} from '../redux/reducers/reducer';

// This container wraps:
// 2) the button that copies the code to the clipboard
// 3) for the stretch feature, this container will have the button that appends the code to the consolidated clipboard

const ButtonContainer = (props) => {
  const dispatch = useDispatch();
  const copyClipboard = () => {
    dispatch(copyText());
    dispatch(changeIcon());
    dispatch(asyncChangeIcon());
  };
  const doneIcon = useSelector((state) => state.slice.doneIcon);

  return (
    <Box
      className='button-container'
      sx={{
        marginLeft: 5,
        marginTop: 2,
        justifyContent: 'flex-end',
        alignItems: 'flex-end'
      }}
    >
      <Button id='bttn-copy' variant='outlined' onClick={copyClipboard}>
        {doneIcon ? <DoneAllIcon /> : <ContentCopyIcon />}
      </Button>
    </Box>
  );
};

export default ButtonContainer;
