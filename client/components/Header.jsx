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
import { Middle } from './Middle';

export const Header = () => {
  const requestType = useSelector((state) => state.testForm.requestType);
  const assertionObject = useSelector((state) => state.testForm.assertionList);
  const index = useSelector((state) => state.testForm.i);
  // const numOfAssertions = useSelector((state) => state.testForm.numOfAssertions);
  // console.log('assertion Object: ', assertionObject[0])
  // const assertionList = [];
  // const values = []
  // if (index !== 0) {
  //   let i = 0;
  //   while (i < index) {
  //     if (assertionObject[i]) {
  //       let el = assertionObject[i]
  //       assertionList.push(el[0])
  //     }
  //     i += 1;
  //   }
  // }
  const assertionList = [];
  const assertionIds = Object.keys(assertionObject);
  for (let id of assertionIds) {
    assertionList.push(<Middle id={id} key={id} />)

  }

  // console.log(assertionList)
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submit Post Request');
  };
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
          // value={values[index]}
          onChange={(e) => dispatch(setRequestType(e.target.value))}
        >
          <MenuItem key="Get" value="Get">
            Get
          </MenuItem>
          <MenuItem key="Post" data-testid="Post" value="Post">
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
      <TextField label="Endpoint" data-testid={requestType} id={requestType} name={requestType} />
      </span>
      <Box id="assertion-list">Assertion List: {assertionList}</Box>
      <Button
        id="add-assertion"
        name="add-assertion"
        variant="contained"
        onClick={() => {
          dispatch(addAssertion());
        }}
      >
        +
      </Button>
    </form>
  );
};
