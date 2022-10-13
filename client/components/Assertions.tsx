import React from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import TextField from '@mui/material/TextField';

import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { deleteAssertion, setInputType } from '../redux/reducers/testFormSlice';
import {
  changeErrorMsg, setUserInputText, setUserInputType
} from '../redux/reducers/userInputSlice';

type assertionsPropsType = {
  id: string;
};

/* 
This component allows a user to indicate what response they expect from the server
to generate the proper test code
*/

export const Assertions = (props: assertionsPropsType) => {
  const dispatch = useAppDispatch();
  const currValue = useAppSelector(
    (state) => state.testForm.assertionList[props.id]
  );
  const assertions = useAppSelector((state) => state.testForm.assertionList);
  const errorMsgs = useAppSelector((state) => state.userInput.errorMsgs);
  const i = useAppSelector((state) => state.userInput.i);

  const verifyNumInputs = (e: any) => { 
    // throws error if user is trying to input more than 1 of the same assertion type
    let statusCount = 0;
    let contentCount = 0;
    const assertionVals = Object.values(assertions);
    assertionVals.forEach((val) => {
      if (val === 'Status Code') statusCount++;
      if (val === 'Content Type') contentCount++;
    });
    if (statusCount >= 2 && e.target.id === 'Status Code')
      dispatch(
        changeErrorMsg({
          propsId: props.id,
          newMsg: '1 status code permitted',
        })
      );
    if (contentCount >= 2 && e.target.id === 'Content Type')
      dispatch(
        changeErrorMsg({
          propsId: props.id,
          newMsg: '1 content type permitted',
        })
      );
  };

  const verifyInputType = (e: any) => { 
    const userInput = e.target.value;
    if (e.target.id === 'Status Code') { 
      // adds verification for status code
      if (!Number(userInput)) {
        dispatch(
          changeErrorMsg({
            propsId: props.id,
            newMsg: 'please enter a number',
          })
        );
      } else if (userInput < 100 || userInput > 511) {
        dispatch(
          changeErrorMsg({
            propsId: props.id,
            newMsg: 'enter a number between 100 and 511',
          })
        );
      } else {
        dispatch(
          changeErrorMsg({
            propsId: props.id,
            newMsg: '',
          })
        );
      }
    } else {
      if (e.target.id === 'Content Type') { 
        // adds verification for content type
        if (
          Number(userInput) ||
          !userInput.includes('/') || 
          userInput[0] === '/' || 
          userInput[userInput.length - 1] === '/'
        ) {
          dispatch(
            changeErrorMsg({
              propsId: props.id,
              newMsg: 'invalid content type',
            })
          );
        } else {
          dispatch(
            changeErrorMsg({
              propsId: props.id,
              newMsg: '',
            })
          );
        }
      }
    }
  };

  const handleChange = (event: SelectChangeEvent<string>) => {
    dispatch(setInputType({ id: props.id, type: event.target.value }));
    dispatch(setUserInputType(event.target.value));
  };

  const handleDelete = (event: any) => {
    dispatch(deleteAssertion(event.target.id));
  };

  const handleType = (event: any) => {
    verifyInputType(event);
    verifyNumInputs(event);
    dispatch(setUserInputText(event.target.value));
  };

  return (
    <div>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '10px',
        }}
      >
        <FormControl>
          <InputLabel></InputLabel>
          <Select
            className="text-display"
            name="more-test-options"
            id={props.id}
            value={currValue}
            onChange={handleChange}
            displayEmpty
            inputProps={{ 'aria-label': 'Without label' }}
            sx={{ height: 40 }}
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
          className="text-display"
          label={currValue}
          id={currValue}
          name={currValue}
          error={!errorMsgs[props.id] ? false : true}
          helperText={errorMsgs[props.id]}
          onChange={handleType}
          required
          size="small"
        />
        <Button
          id={props.id}
          onClick={handleDelete}
          variant="contained"
          color="primary"
          sx={{ height: 25, minWidth: 23, width: 23 }}
          disableElevation
        >
          -
        </Button>
      </Box>
    </div>
  );
};
