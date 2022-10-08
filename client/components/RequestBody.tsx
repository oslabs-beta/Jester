import React from 'react';
import { TextField } from '@mui/material';

type requestBodyPropsType = {
  showField: boolean;
};

/*
This component will allow a user to input a request body if the selected request type is 
'Post,' 'Patch,' or 'Delete'
*/

export const RequestBody = (props: requestBodyPropsType) => {
  if (props.showField) {
    return (
      <TextField
        className="text-display"
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
