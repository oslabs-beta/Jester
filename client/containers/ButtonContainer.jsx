import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import { useSelector, useDispatch } from 'react-redux'
// import { useAppSelector, useAppDispatch } from '../redux/redux-hooks'

import { copyText, changeIcon } from '../reducers/reducer';

// This container wraps:
// 2) the button that copies the code to the clipboard
// 3) for the stretch feature, this container will have the button that appends the code to the consolidated clipboard

const ButtonContainer = (props) => {
  const dispatch = useDispatch();
  // const dispatch = useAppDispatch();
  const copyClipboard = () => {
    dispatch(copyText())
    dispatch(changeIcon())
  }
  // const doneIcon = useSelector(state => state.slice.doneIcon)
  const doneIcon = useAppSelector(state => state.slice.doneIcon)

  return (
    <Box sx={{ 
      width: 800,
      marginLeft: 5,
      marginTop: 2,
      justifyContent: 'flex-end',
      alignItems: 'flex-end',
      }}>
      <Button 
        variant="outlined"
        onClick={ copyClipboard }
      >
        { (doneIcon) ? <DoneAllIcon/> : <ContentCopyIcon/> }
      </Button>
    </Box>
  )
}

export default ButtonContainer;