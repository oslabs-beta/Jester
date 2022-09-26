import React from 'react';
//What import from MUI? Kinda don't want to use a Textfield bc it can be edited and I can't protect it from that?
import TextField from '@mui/material/TextField';
//Will need RTK?
import { useSelector, useDispatch } from 'react-redux'
import { userEditText } from '../redux/reducers/reducer';




//Slice of State named to ClipboadData
//Have a reducer called setClipboard (thi sserena will use to set this clipboard data.) Will need state in action payload and payload will be array of strings from db.


function ClipBoard(props) {
    return (
        <TextField 
        id="clipboard"
        multiline
        rows={10}
        sx={{ 
            width: 0.95,
            fontFamily: "Source Code Pro",
            }}
        />
    );
}

export default ClipBoard;

// https://mui.com/material-ui/
// https://redux-toolkit.js.org/tutorials/quick-start