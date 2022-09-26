import {
  FormControl,
  MenuItem,
  Select,
  TextField,
  Button,
  Box,
  InputLabel,
  SelectChangeEvent,
  Typography,
} from '@mui/material';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import {
  setRequestType,
  addAssertion,
  setFormValues,
} from '../redux/reducers/testFormSlice';
import { setCodeOutput } from '../redux/reducers/reducer';
import { setErrorMsg } from '../redux/reducers/userInputSlice';
import { Middle } from './Middle';
import { RequestBody } from './RequestBody';
import { ChangeEvent } from 'react';
import axios from 'axios';

export const Header = () => {
  const requestType = useAppSelector((state) => state.testForm.requestType);
  const formValues = useAppSelector((state) => state.testForm.formValues);
  const assertionObject = useAppSelector(
    (state) => state.testForm.assertionList
  );
  const assertionList: JSX.Element[] = [];
  const assertionIds = Object.keys(assertionObject);
  for (let id of assertionIds) {
    assertionList.push(<Middle id={id} key={id} />);
  }
  const dispatch = useAppDispatch();
  const handleSubmit = async (
    e: React.FormEvent<EventTarget>
  ): Promise<unknown> => {
    e.preventDefault();
    const response = await axios.post('/api/tests', formValues);
    dispatch(setCodeOutput(response.data));
    return;
  };
  const handleRequestChange = (e: SelectChangeEvent<string>) => {
    dispatch(setRequestType(e.target.value));
    dispatch(setFormValues({ key: 'method', value: e.target.value }));
  };
  const handleFormValueChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => dispatch(setFormValues({ key: e.target.id, value: e.target.value }));
  const handleChange = (e: SelectChangeEvent<string>) =>
    dispatch(setRequestType(e.target.value));
  const handleAdd = () => {
    dispatch(addAssertion());
    dispatch(setErrorMsg());
  };

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
    <form id="test-generator-form" onSubmit={handleSubmit}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <FormControl>
          <InputLabel id="requestSelector">Request Type</InputLabel>
          <Select
            name="request-selector"
            id="request-selector"
            data-testid="request-selector"
            label="Request Type"
            value={requestType}
            onChange={handleRequestChange}
            sx={{ width: '100px' }}
          >
            {menuItems}
          </Select>
        </FormControl>
        <TextField
          label="Endpoint"
          data-testid={requestType}
          id="endpoint"
          name={requestType}
          onChange={handleFormValueChange}
          required
        />
        <RequestBody showField={requestType === 'Get' ? false : true} />
      </Box>
      <Box
        id="assertion-list"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '10px',
          marginBottom: '10px',
        }}
      >
        <Typography>Add expected response:</Typography>
        {assertionList}
      <Button
        id="add-assertion"
        name="add-assertion"
        variant="outlined"
        onClick={handleAdd}
      >
        +
      </Button>
      </Box>
      <Button type="submit" variant="text" sx={{ backgroundColor: '#E6E6FA' }}>
        Generate Test Code
      </Button>
    </form>
  );
};
