import React from 'react';
import {
    FormControl,
    MenuItem,
    Select,
    TextField,
    Button,
    InputLabel,
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux' 
import { setInputType, addUserInput, deleteAssertion } from '../redux/reducers/testFormSlice';
import { useState } from 'react';

export const Middle = (props) => {
    const dispatch = useDispatch();
    const userInput = useSelector((state) => state.testForm.userInput);
    const inputType = useSelector((state) => state.testForm.inputType);
    const assertionObject = useSelector((state) => state.testForm.assertionList);
    // let currValue = assertionObject[props.id][1];
    // console.log(currValue)
    // const [currValue, setCurrValue] = React.useState('Status Code');
    const currValue = useSelector((state) => state.testForm.assertionList[props.id]);

    // state.assertionObj = {
    //     // k, v => id, assertion_type
    //     0: 'Status Code',
    //     1: 'Status Code',
    //     2: 'Status Code',
    //     3: 'Status Code',
    //     4: 'Status Code',
    // }

    // formResponse = {
    //     'Status Code': 200,
    //     'Content-Type': 'Text/Html',
    //     'Request-Type': 'Get',
        

    // }

    const handleChange = (event) => {
        console.log('props.id: ', props.id)
        console.log('Handle Change - e: ', event)
        dispatch(setInputType({id: props.id, type: event.target.value}));
      };

    return (
        <div>
            <span>
                <FormControl>
                    <InputLabel>Test Option</InputLabel>
                    <Select
                        // name="more-test-options"
                        // id={props.id}
                        // label="Test Option"
                        // value={currValue}
                        // onChange={(e) => dispatch(setInputType(e.target))}
                        // onChange={(e) => {
                        //     e.preventDefault()
                        //     console.log('e.target: ', e.target)
                        //     console.log('e.target.id: ', e.target.id)
                        //     console.log(document.getElementsByName('more-test-options')[0])
                        //     document.getElementsByName('more-test-options')[0].value = e.target.value
                        //     dispatch(setInputType(e.target))
                            
                        // }}
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
