import React from 'react';
import TextField from '@mui/material/TextField';
//Will need RTK to create slice of state and for reducer functions.
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { userEditText } from '../redux/reducers/reducer';
import { ChangeEvent } from 'react';


// const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setName(event.target.value);
//   };



//Slice of State named to ClipboadData
//Have a reducer called setClipboard (thi sserena will use to set this clipboard data.) Will pass the clipboard text form the db to the action payload and payload will be array of strings from db.
// access clipboard info from state and put it into the clipboard. Set the clipboard data in state.

function ClipBoard() {
    const dispatch = useAppDispatch();
    const editCode = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => dispatch(userEditText(e.target.value));
    // const setClipboard = ();


    return (
        <TextField
        id="clipboard"
        multiline
        rows={10}
        defaultValue={ "Your Clipboard is currently empty!" }
        sx={{ 
            width: 0.95,
            fontFamily: "Source Code Pro",
            }}
        onChange = { editCode }

        />
    );
}

export default ClipBoard;

// https://mui.com/material-ui/
// https://redux-toolkit.js.org/tutorials/quick-start