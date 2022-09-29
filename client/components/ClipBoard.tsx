import React from 'react';
import TextField from '@mui/material/TextField';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { userEditText } from '../redux/reducers/ClipBoardReducers';
import { ChangeEvent, useEffect } from 'react';
import ClipboardButton from '../containers/ClipboardButton';
import { useParams } from 'react-router-dom'
import { setCodeOutput1 } from '../redux/reducers/ClipBoardReducers';
import axios from 'axios';


// const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setName(event.target.value);
//   };

//Slice of State named to ClipboadData
//Have a reducer called setClipboard (thi serena will use to set this clipboard data.) Will pass the clipboard text form the db to the action payload and payload will be array of strings from db.
// access clipboard info from state and put it into the clipboard. Set the clipboard data in state.

// just grab clipboard data from state and display in field to copy it.
// will want slice of state for clipboard bc want to copy michael's copy button code. need to put that code in a new reducer which will be in a new slice of state.

// This component will render the code from the db that is stored in state alredy from Serena.



//Had to create slice1 in the store.ts you big dummy!
const ClipBoard = () => {
    const codeOutput1 = useAppSelector(state => state.slice1.codeOutput1)
    // useAppSelector (state => state.userInfo.projectsInfo)
    const codeOutputEdited1 = useAppSelector(state => state.slice1.codeOutputEdited1)
    const dispatch = useAppDispatch();
    const editCode = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => dispatch(userEditText(e.target.value));
    // Need to refactor to expect project id to be drilled down.
    // useAppselector to grab slice of state. Then use a new reducer to update slice of state.

    const { projectId } = useParams();
    useEffect(() => {
        // *Learning*: //In axios you don't have to parse or stringify your data.
        // axios.get(`/Api/Clipboard/${projectId}`)
        // .then((response) => {dispatch(setCodeOutput1(response))});
        fetch(`/Api/Clipboard/${projectId}`)
        .then((response) => response.json())
        // .then((response) => console.log(response));
        .then((response) => {dispatch(setCodeOutput1(response))});
    });



    return (
        <div id="clipboard-page-body">
            <TextField
            id="main-clipboard"
            multiline
            rows={10}
            value={ codeOutputEdited1 || codeOutput1 }
            sx={{ 
                width: 0.95,
                fontFamily: "Source Code Pro",
                }}
            onChange = { editCode }
            />
            <ClipboardButton />
        </div>
    );
}

export default ClipBoard;

// https://mui.com/material-ui/
// https://redux-toolkit.js.org/tutorials/quick-start