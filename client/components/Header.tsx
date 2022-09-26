import {
  FormControl,
  MenuItem,
  Select,
  TextField,
  Button,
  Box,
  InputLabel,
  SelectChangeEvent
} from '@mui/material';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { setRequestType, addAssertion } from '../redux/reducers/testFormSlice';
import { Middle } from './Middle';
import { RequestBody } from './RequestBody';

export const Header = () => {
  const requestType = useAppSelector((state) => state.testForm.requestType);
  const assertionObject = useAppSelector(
    (state) => state.testForm.assertionList
  );
  const assertionList: JSX.Element[] = [];
  const assertionIds = Object.keys(assertionObject);
  for (let id of assertionIds) {
    assertionList.push(<Middle id={id} key={id} />);
  }
  const dispatch = useAppDispatch();
  const handleSubmit = (e: React.FormEvent<EventTarget>): void => {
    e.preventDefault();
    console.log('Submit Post Request');
  };
  const handleChange = (e: SelectChangeEvent<string>) =>
    dispatch(setRequestType(e.target.value));
  const handleAdd = () => dispatch(addAssertion());

  const menuItems: JSX.Element[] = [];
  const menuOptions = ['Get', 'Post', 'Patch', 'Delete'];
  for (let option of menuOptions) {
    menuItems.push(
      <MenuItem key={option} value={option}>
        {option}
      </MenuItem>
    );
  }

  return (
    <form id='test-generator-form' onSubmit={handleSubmit}>
      <span>
        <FormControl>
          <InputLabel id='requestSelector'>Request Type</InputLabel>
          <Select
            name='request-selector'
            id='request-selector'
            data-testid='request-selector'
            label='Request Type'
            value={requestType}
            onChange={handleChange}
          >
            {menuItems}
          </Select>
        </FormControl>
        <TextField
          label='Endpoint'
          data-testid={requestType}
          id={requestType}
          name={requestType}
        />
        <RequestBody showField={requestType === 'Get' ? false : true} />
      </span>
      <Box id='assertion-list'>Assertion List: {assertionList}</Box>
      <Button
        id='add-assertion'
        name='add-assertion'
        variant='contained'
        onClick={handleAdd}
      >
        +
      </Button>
    </form>
  );
};
