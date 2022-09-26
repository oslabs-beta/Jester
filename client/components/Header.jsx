import {
  FormControl,
  MenuItem,
  Select,
  TextField,
  Button,
  Box,
  InputLabel,
} from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setRequestType, addAssertion } from '../redux/reducers/testFormSlice';
import { setErrorMsg } from '../redux/reducers/userInputSlice';
import { Middle } from './Middle';

export const Header = () => {
  const requestType = useSelector((state) => state.testForm.requestType);
  const assertionObject = useSelector((state) => state.testForm.assertionList);
  const assertionList = [];
  const assertionIds = Object.keys(assertionObject);
  for (let id of assertionIds) {
    assertionList.push(<Middle id={id} key={id} />);
  }
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submit Post Request');
  };
  const handleChange = (e) => dispatch(setRequestType(e.target.value));
  const handleAdd = () => {
    dispatch(addAssertion())
    dispatch(setErrorMsg())
  };

  const menuItems = [];
  const menuOptions = ['Get', 'Post', 'Patch', 'Delete'];
  for (let option of menuOptions) {
    menuItems.push(<MenuItem key={option} value={option}>{option}</MenuItem>)
  }

  return (
    <form id="test-generator-form" onSubmit={handleSubmit}>
      <span>
        <FormControl>
          <InputLabel id="requestSelector">Request Type</InputLabel>
          <Select
            name="request-selector"
            id="request-selector"
            data-testid="request-selector"
            label="Request Type"
            value={requestType}
            onChange={ handleChange }
          >
            {menuItems}
          </Select>
        </FormControl>
        <TextField
          label="Endpoint"
          data-testid={requestType}
          id={requestType}
          name={requestType}
        />
      </span>
      <Box id="assertion-list">Assertion List: {assertionList}</Box>
      <Button
        id="add-assertion"
        name="add-assertion"
        variant="contained"
        onClick={ handleAdd }
      >
        +
      </Button>
    </form>
  );
};
