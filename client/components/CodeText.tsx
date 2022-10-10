import React from 'react';
import TextField from '@mui/material/TextField';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { ChangeEvent } from 'react';

import { userEditText } from '../redux/reducers/codeSlice';

// This component will render the generated test code received from the fetch request to the server
const CodeText = () => {
  const codeOutput = useAppSelector((state) => state.slice.codeOutput);
  const codeOutputEdited = useAppSelector(
    (state) => state.slice.codeOutputEdited
  );
  const dispatch = useAppDispatch();
  const editCode = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    dispatch(userEditText(e.target.value));

  return (
    <TextField
      id="code-output"
      className="text-display"
      label="Testing Code"
      variant="filled"
      multiline
      rows={10}
      value={codeOutputEdited || codeOutput}
      sx={{
        width: 0.95,
        backgroundColor: '#011E3C',
        color: 'white',
        pl: 2
      }}
      onChange={editCode}
    />
  );
};

export default CodeText;
