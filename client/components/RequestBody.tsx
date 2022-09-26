import React from 'react';
import { TextField } from '@mui/material';

type requestBodyPropsType = {
  showField: Boolean,
}

export const RequestBody = (props: requestBodyPropsType) => {
  if (props.showField) {
    return (
      <TextField label="Request Body" id="Request-Body" data-testid="Request-Body" name="Request-Body" />
    );
  } else return null;
};
