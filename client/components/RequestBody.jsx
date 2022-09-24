import React from 'react';
import { TextField } from '@mui/material';

export const RequestBody = (props) => {
  if (props.showField) {
    return (
      <TextField label="Request Body" id="Request-Body" data-testid="Request-Body" name="Request-Body" />
    );
  } else return;
};
