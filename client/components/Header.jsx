import {
  FormControl,
  MenuItem,
  Select,
  TextField,
  Button,
  Box,
} from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setRequestType, addAssertion } from '../reducers/testFormSlice';

export const Header = () => {
  const requestType = useSelector((state) => state.testForm.requestType);
  const assertionList = useSelector((state) => state.testForm.assertionList);
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submit Post Request');
  };
  return (
    <form onSubmit={handleSubmit}>
      <FormControl>
        <Select
          name="request-selector"
          label="Request Type"
          value={requestType}
          onChange={(e) => dispatch(setRequestType(e.target))}
        >
          <MenuItem key="Get" value="Get">
            Get
          </MenuItem>
          <MenuItem key="Post" value="Post">
            Post
          </MenuItem>
          <MenuItem key="Patch" value="Patch">
            Patch
          </MenuItem>
          <MenuItem key="Delete" value="Delete">
            Delete
          </MenuItem>
        </Select>
      </FormControl>
      <TextField label="Endpoint" id={requestType} name={requestType} />
      <Box id="assertion-list">Assertion List: {assertionList}</Box>
      <Button
        id="add-assertion"
        onClick={() => {
          dispatch(addAssertion());
        }}
      >
      +
      </Button>
    </form>
  );
};
