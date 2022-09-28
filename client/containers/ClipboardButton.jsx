import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import { useSelector, useDispatch, useAppSelector } from 'react-redux'

import { copyCB, changeIcon1, asyncChangeIcon1 } from '../redux/reducers/ClipBoardReducers';

// This container wraps:
// 2) the button that copies the code to the clipboard
// 3) for the stretch feature, this container will have the button that appends the code to the consolidated clipboard

const ClipboardButton = (props) => {
  const dispatch = useDispatch();
  const copyClipboard = () => {
    dispatch(copyCB())
    dispatch(changeIcon1())
    dispatch(asyncChangeIcon1())
  }

  const doneIcon = useSelector(state => state.slice.doneIcon1)

  return (
    <Box sx={{ 
      width: 800,
      marginLeft: 5,
      marginTop: 2,
      justifyContent: 'flex-end',
      alignItems: 'flex-end',
      }}>
      <Button 
        id="bttn-copy"
        variant="outlined"
        onClick={ copyClipboard }
      >
        { (doneIcon) ? <DoneAllIcon/> : <ContentCopyIcon/> }
      </Button>
    </Box>
  )
}

export default ClipboardButton;