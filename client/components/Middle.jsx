import React from 'react';
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

export const Middle = (props) => {
  const dispatch = useDispatch();
  const currValue = useSelector(
    (state) => state.testForm.assertionList[props.id]
  );

  const handleChange = (event) => {
    dispatch(setInputType({ id: props.id, type: event.target.value }));
  };

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
        <TextField label="User Input" id={currValue} name={currValue} />
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
