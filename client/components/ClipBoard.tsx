import React from 'react';
import TextField from '@mui/material/TextField';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { userEditText } from '../redux/reducers/ClipBoardReducers';
import { ChangeEvent, useEffect } from 'react';
import ClipboardButton from '../containers/ClipboardButton';
import { useParams } from 'react-router-dom';
import { setCodeOutput1 } from '../redux/reducers/ClipBoardReducers';

const ClipBoard = () => {
  const codeOutput1 = useAppSelector((state) => state.slice1.codeOutput1);

  const codeOutputEdited1 = useAppSelector(
    (state) => state.slice1.codeOutputEdited1
  );
  const dispatch = useAppDispatch();
  const editCode = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    dispatch(userEditText(e.target.value));
  const { projectId } = useParams();
  useEffect(() => {
    if (sessionStorage.getItem('isLoggedIn')) {
      fetch(`/Api/Clipboard/${projectId}`)
        .then((response) => response.json())
        .then((response) => dispatch(setCodeOutput1(response)))
        .catch((err) => console.log(err));
    }
  });

  return (
    <div id="clipboard-page-body">
      <TextField
        id="main-clipboard"
        multiline
        rows={10}
        value={codeOutputEdited1 || codeOutput1}
        sx={{
          width: 0.95,
          fontFamily: 'Source Code Pro',
        }}
        onChange={editCode}
      />
      <ClipboardButton />
    </div>
  );
};

export default ClipBoard;
