import React from 'react';
import TextField from '@mui/material/TextField';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { userEditText } from '../redux/reducers/ClipBoardReducers';
import { ChangeEvent, useEffect } from 'react';
import ClipboardButton from '../containers/ClipboardButton';
//import useParams() from reactRouterDom?


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

    // const { projectId } = useParams();
    // useEffect -> requesst to the backend to get CB data.
    // Want to useEffect hook bc we want this to run on the render of the page being id'd by the front-end route.
    useEffect(() => {
        // when this function runs, it will go to the backend and grab the data using a fetch request.
        fetch('database')
        // once we have accessed the data we want, let's read and parse it from json
        .then((response) => response.json())
        //once converted to json, where do we want to send it?
        //We want to send it to live in state, but how? Do I call a reducer function here? This means I'd call a reducer outside of the textField.
        // So inside this then, I want to call a reducer to update the state with whatever the response is.
        .then(respone => {})
    });
    // then now that I have the data, feed it into state. ? -> going to need to create and invoke a reducer inside of this component to set value of state.
    // Render state in CB. To render the state all I need to do is reassign the codeOutputEdited1 (which is in state already) with whatever completedSnippet code we recieve from the fetch request.

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