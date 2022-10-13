import React from 'react';

import TextField from '@mui/material/TextField';

type requestBodyPropsType = {
  showField: boolean;
};

/*
This component will allow a user to input a request body if the selected request type is 
'Post,' 'Patch,' or 'Delete'
*/

export const RequestBody = (props: requestBodyPropsType) => {
  return (
    <TextField
      className="text-display"
      label="Request Body"
      id="req_body"
      data-testid="Request-Body"
      name="Request-Body"
      disabled={props.showField ? false : true}
      sx={{ backgroundColor: props.showField ? 'none' : '#E8E8E8' }}
      size="small"
    />
  );
};
