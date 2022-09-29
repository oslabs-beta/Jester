import React from 'react';
import { TextField } from '@mui/material';
import { useAppDispatch } from '../redux/hooks';

type requestBodyPropsType = {
  showField: boolean;
};

export const RequestBody = (props: requestBodyPropsType) => {
  if (props.showField) {
    return (
      <TextField
        label="Request Body"
        id="req_body"
        data-testid="Request-Body"
        name="Request-Body"
        size="small"
      />
    );
  } else
    return (
      <TextField
        label="Request Body"
        id="req_body"
        data-testid="Request-Body"
        name="Request-Body"
        disabled={true}
        sx={{ backgroundColor: 'lightgrey' }}
        size="small"
      />
    );
};
