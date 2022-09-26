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
import { setRequestType, addAssertion, setFormValues } from '../redux/reducers/testFormSlice';
import { setErrorMsg } from '../redux/reducers/userInputSlice';
import { Middle } from './Middle';
import { RequestBody } from './RequestBody';
import { ChangeEvent } from 'react';

export const Header = () => {
  const requestType = useAppSelector((state) => state.testForm.requestType);
  const assertionObject = useAppSelector((state) => state.testForm.assertionList);
  const formValues = useAppSelector((state) => state.testForm.formValues);
  console.log(formValues)
  const assertionList: JSX.Element[] = [];
  const assertionIds = Object.keys(assertionObject);
  for (let id of assertionIds) {
    assertionList.push(<Middle id={id} key={id} />);
  }
  const dispatch = useAppDispatch();
  const handleSubmit = (e: React.FormEvent<EventTarget>): void => {
    e.preventDefault();

    // {
    //   header: {
    //             endpoint : '/',
    //             method: 'POST'
    //             req_body: {a:1} // Needed for POST and PATCH, optional for DELETE
    //   },
    //   assertions: [
    //                 { content: '/text\/html/' },
    //                 { status: 200 },
    //                 { res_body: { a: 'b' } }
    //                 ...
    //   ]
    // }
    console.log('Submit Post Request');
  };
  const handleRequestChange = (e: SelectChangeEvent<string>) => {
    dispatch(setRequestType(e.target.value));
    dispatch(setFormValues({key: 'method', value: e.target.value}));
  }
  const handleFormValueChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => dispatch(setFormValues({key: e.target.id, value: e.target.value}))
  const handleAdd = () => {
    dispatch(addAssertion())
    dispatch(setErrorMsg())
  };

  const menuItems: JSX.Element[] = [];
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
            onChange={ handleRequestChange }
          >
            {menuItems}
          </Select>
        </FormControl>
        <TextField
          label="Endpoint"
          data-testid={requestType}
          id="endpoint"
          name={requestType}
          onChange={ handleFormValueChange }
        />
        <RequestBody showField={requestType === 'Get' ? false : true} />
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
      <Button type="submit">Generate Test Code</Button>
    </form>
  );
};
