import React from 'react';
import {
    FormControl,
    MenuItem,
    Select,
    TextField,
    Button
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux' 
import { setInputType, addUserInput, deleteAssertion } from '../redux/reducers/middleSlice';

export const Middle = (props) => {

    const dispatch = useDispatch();
    const userInput = useSelector((state) => state.middle.userInput);
    const inputType = useSelector((state) => state.middle.inputType);

    return (
        <div>
            <span>
                <FormControl>
                    <Select
                        name="more-test-options"
                        label="Test Option"
                        value={inputType}
                        onChange={(e) => dispatch(setInputType(e.target))}
                    >
                        <MenuItem key="Status Code" value="Status Code">
                            Status Code
                        </MenuItem>
                        <MenuItem key="Content Type" value="Content Type">
                            Content Type
                        </MenuItem>
                        <MenuItem key="Response Body" value="Response Body">
                            Status Code
                        </MenuItem>
                    </Select>
                </FormControl>
                <TextField 
                label="User Input" 
                id={userInput} 
                name={userInput}
                value={userInput}
                onChange={addUserInput}
                />
                <Button id={props.id} onClick={(e) => dispatch(deleteAssertion(e.target.id))}>-</Button>
            </span>
        </div>
    )
}
