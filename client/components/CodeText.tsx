import React from 'react';
import TextField from '@mui/material/TextField';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { ChangeEvent } from 'react';

import { userEditText } from '../redux/reducers/codeSlice';

// This component will render the generated test code received from the fetch request to the server
const CodeText = () => {
  const codeOutput = useAppSelector((state) => state.code.codeOutput);
  const codeOutputEdited = useAppSelector(
    (state) => state.code.codeOutputEdited
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
      minRows={ 10 }
      value={ codeOutputEdited || codeOutput }
      sx={{
        width: 1,
        backgroundColor: '#011E3C',
        color: 'white',
        pl: 2,
        borderRadius: 2,
      }}
      onChange={ editCode }
    />
  );
};

export default CodeText;
