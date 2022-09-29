import React, { useState } from 'react';
import {
  FormControl,
  MenuItem,
  Select,
  TextField,
  Button,
  InputLabel,
  SelectChangeEvent,
  Box,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { setInputType, deleteAssertion } from '../redux/reducers/testFormSlice';
import {
  setUserInputType,
  changeErrorMsg,
  setUserInputText,
} from '../redux/reducers/userInputSlice';

type middlePropsType = {
  id: string;
};

export const Middle = (props: middlePropsType) => {
  const dispatch = useAppDispatch();
  const currValue = useAppSelector(
    (state) => state.testForm.assertionList[props.id]
  );
  const assertions = useAppSelector((state) => state.testForm.assertionList);
  const errorMsgs = useAppSelector((state) => state.userInput.errorMsgs);
  const i = useAppSelector((state) => state.userInput.i);

  const verifyNumInputs = (e: any) => {
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
      if (!Number(userInput)) {
        dispatch(
          changeErrorMsg({
            propsId: props.id,
            newMsg: 'invalid status code',
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
      if (e.target.id === 'Content Type' && Number(userInput)) {
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
          label={currValue}
          id={currValue}
          name={currValue}
          error={!errorMsgs[props.id] ? false : true}
          //   id="outlined-error-helper-text"
          //   label="Error"
          helperText={errorMsgs[props.id]}
          onChange={handleType}
          required
          size="small"
        />
        <Button
          id={props.id}
          onClick={handleDelete}
          variant="contained"
          color="secondary"
          sx={{ height: 39 }}
          disableElevation
        >
          -
        </Button>
      </Box>
    </div>
  );
};
