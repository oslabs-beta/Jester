import React from 'react';
import TextField from '@mui/material/TextField';
import { useSelector, useDispatch } from 'react-redux'

import { userEditText } from '../redux/reducers/reducer';

// This component will render the code received from the fetch request to the server
// Also, in the stretch feature, as the user edits the code, it will be saved to the database
const CodeText = (props) => {
  const codeOutput = useSelector(state => state.slice.codeOutput)
  const codeOutputEdited = useSelector(state => state.slice.codeOutputEdited)
  const dispatch = useDispatch();
  const editCode = (e) => dispatch(userEditText(e.target.value))

  return (
      <TextField
      id="code-output"
      label="Testing Code"
      multiline
      rows={10}
      defaultValue={ codeOutputEdited || codeOutput }
      sx={{ 
        width: 0.95,
        fontFamily: "Source Code Pro",
        }}
      onChange = { editCode }
    />
  )
}

export default CodeText;