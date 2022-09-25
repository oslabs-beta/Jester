import React from 'react';
import {
  FormControl,
  MenuItem,
  Select,
  TextField,
  Button,
  InputLabel,
  SelectChangeEvent
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { setInputType, deleteAssertion } from '../redux/reducers/testFormSlice';

type middlePropsType = {
  id: string,
}

export const Middle = (props: middlePropsType) => {
  const dispatch = useAppDispatch();
  const currValue = useAppSelector(
    (state) => state.testForm.assertionList[props.id]
  );


  const handleChange = (event: SelectChangeEvent<string>) => {
    dispatch(setInputType({ id: props.id, type: event.target.value }));
  };

  const handleDelete = (event: React.FormEvent<EventTarget>) => {
    const targ = event.target as HTMLInputElement
    dispatch(deleteAssertion(targ.id))
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
        <TextField label="User Input" id={currValue} name={currValue} />
        <Button
          id={props.id}
          onClick={handleDelete}
        >
          -
        </Button>
      </span>
    </div>
  );
};
