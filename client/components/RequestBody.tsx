import React from 'react';
import { TextField } from '@mui/material';
import { useAppDispatch } from '../redux/hooks';
import { setFormValues } from '../redux/reducers/testFormSlice';

type requestBodyPropsType = {
  showField: Boolean;
};

export const RequestBody = (props: requestBodyPropsType) => {
  const dispatch = useAppDispatch();
  const handleChange = (e: any) =>
    dispatch(setFormValues({ key: e.target.id, value: e.target.value }));
  if (props.showField) {
    return (
      <TextField
        label="Request Body"
        id="req_body"
        data-testid="Request-Body"
        name="Request-Body"
        onChange={handleChange}
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
      />
    );
};
