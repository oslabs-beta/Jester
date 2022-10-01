import React from 'react';
import { TextField, Box } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { userEditText } from '../redux/reducers/ClipBoardReducers';
import { ChangeEvent, useEffect } from 'react';
import ClipboardButton from '../containers/ClipboardButton';
import { useParams } from 'react-router-dom';
import { setCodeOutput1, setServer } from '../redux/reducers/ClipBoardReducers';

const ClipBoard = () => {
  const codeOutput1 = useAppSelector((state) => state.slice1.codeOutput1);
  const server: string = useAppSelector((state) => state.slice1.server);
  const codeOutputEdited1 = useAppSelector(
    (state) => state.slice1.codeOutputEdited1
  );
  const dispatch = useAppDispatch();
  const editCode = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    dispatch(userEditText(e.target.value));
  const { projectId } = useParams();

  const updateServer = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setServer(e.target.value));
  };
  useEffect(() => {
    fetch(`/Api/Clipboard/${projectId}`)
      .then((response) => response.json())
      .then((response) => dispatch(setCodeOutput1(response)))
      .catch((err) => console.log(err));
  });

  return (
    <Box
      id="clipboard-page-body"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '10px',
      }}
    >
      <TextField
        label="Server URL"
        sx={{ width: '300px' }}
        value={server}
        error={server === ''}
        onChange={updateServer}
      ></TextField>
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
    </Box>
  );
};

export default ClipBoard;
