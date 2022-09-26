import React, { useState } from 'react';
import {
  FormControl,
  MenuItem,
  Select,
  TextField,
  Button,
  InputLabel,
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { setInputType, deleteAssertion } from '../redux/reducers/testFormSlice';
import { setUserInputType, changeErrorMsg, setUserInputText } from '../redux/reducers/userInputSlice';

export const Middle = (props) => {

  const dispatch = useDispatch();
  const currValue = useSelector(
    (state) => state.testForm.assertionList[props.id]
  );
  const assertions = useSelector(
    (state) => state.testForm.assertionList
  )
    const errorMsgs = useSelector(
    (state) => state.userInput.errorMsgs
  )
    const i = useSelector(
      (state) => state.userInput.i
    )

   const verifyNumInputs = (e) => {
    let statusCount = 0;
    let contentCount = 0;
    const assertionVals = Object.values(assertions);
        assertionVals.forEach((val) =>  {
            if (val === 'Status Code') statusCount ++;
            if (val === 'Content Type') contentCount++;
        })
        if (statusCount >= 2 && e.target.id === 'Status Code') dispatch(changeErrorMsg({
          propsId: props.id,
          newMsg: '1 status code permitted'
        }));
        if (contentCount >= 2 && e.target.id === 'Content Type') dispatch(changeErrorMsg({
          propsId: props.id,
          newMsg: '1 content type permitted'
        }));
  }

  const verifyInputType = (e) => {
    const userInput = e.target.value;
    if (e.target.id === 'Status Code') {
      if (!Number(userInput)) {
        dispatch(changeErrorMsg({
          propsId: props.id,
          newMsg: 'invalid status code'
        }));
      } else {
        dispatch(changeErrorMsg({
          propsId: props.id,
          newMsg: 'looks good!'
        }));
      }
    } else {
      if (e.target.id === 'Content Type' && Number(userInput)) {
        dispatch(changeErrorMsg({
          propsId: props.id,
          newMsg: 'invalid content type'
        }));
    } else {
        dispatch(changeErrorMsg({
          propsId: props.id,
          newMsg: 'looks good!'
        }));
    }
    }


  }

  const handleChange = (event) => {
    dispatch(setInputType({ id: props.id, type: event.target.value }));
    dispatch(setUserInputType(event.target.value));
  };

  const handleType = (event) => {
    verifyInputType(event);
    verifyNumInputs(event);
    dispatch(setUserInputText(event.target.value));
  }

  return (
    <div>
      <span>
        <FormControl>
          <InputLabel>Test Option</InputLabel>
          <Select
            name="more-test-options"
            id={props.id}
            value={currValue}
            onChange={handleChange}
            displayEmpty
            inputProps={{ 'aria-label': 'Without label' }}
          >
            <MenuItem key="Status Code" value="Status Code" id={props.id}>
              Status Code
            </MenuItem>
            <MenuItem key="Content Type" value="Content Type" id={props.id}>
              Content Type
            </MenuItem>
            <MenuItem key="Response Body" value="Response Body" id={props.id}>
              Response Body
            </MenuItem>
          </Select>
        </FormControl>
        <TextField 
        label="User Input" 
        id={currValue} 
        name={currValue} 

        error
        //   id="outlined-error-helper-text"
        //   label="Error"
          helperText={errorMsgs[props.id]}
          onChange={handleType}
        />
        <Button
          id={props.id}
          onClick={(e) => dispatch(deleteAssertion(e.target.id))}
        >
          -
        </Button>
      </span>
    </div>
  );
};
