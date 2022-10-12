import React from 'react';
import { TextField } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { ChangeEvent } from 'react';

import { setCodeOutput } from '../redux/reducers/codeSlice';

// This component will render the generated test code received from the fetch request to the server
const CodeText = () => {
  const codeOutput = useAppSelector((state) => state.code.codeOutput);
  const dispatch = useAppDispatch();
  const editCode = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    dispatch(setCodeOutput(e.target.value));

  return (
    <TextField
      id="code-output"
      className="text-display"
      label="Testing Code"
      variant="filled"
      multiline
      minRows={ 10 }
      value={ codeOutput }
      sx={{
        width: 0.95,
        backgroundColor: '#282C34',
        color: 'white',
        pl: 2,
        borderRadius: 2,
      }}
      onChange={ editCode }
    />
  );
};

export default CodeText;
