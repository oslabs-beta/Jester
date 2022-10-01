import React from 'react';
import { TextField, Box, Button } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { userEditText } from '../redux/reducers/ClipBoardReducers';
import { ChangeEvent, useEffect } from 'react';
import ClipboardButton from '../containers/ClipboardButton';
import { useParams, useNavigate } from 'react-router-dom';
import {
  setCodeOutput1,
  setServer,
  clearCodeSnippets,
} from '../redux/reducers/ClipBoardReducers';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import axios from 'axios';

const ClipBoard = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const codeOutput1 = useAppSelector((state) => state.slice1.codeOutput1);
  const server: string = useAppSelector((state) => state.slice1.server);
  const codeOutputEdited1 = useAppSelector(
    (state) => state.slice1.codeOutputEdited1
  );

  const editCode = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    dispatch(userEditText(e.target.value));
  const { projectId } = useParams();

  const updateServer = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setServer(e.target.value));
  };

  const handleClear = () => {
  //   if (sessionStorage.getItem('isLoggedIn')) {
  //     axios.delete(`/api/project/${projectId}`);
  //     navigate('/');
  //   } else {
  //     dispatch(clearCodeSnippets());
  //   }
  };
  // need to discuss how to implement handleClear

  useEffect(() => {
    fetch(`/api/clipboard/${projectId}`)
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
      <Button
        onClick={handleClear}
        sx={{ display: sessionStorage.getItem('isLoggedIn') ? 'none' : 'flex', flexDirection: 'column' }}
      >
        <DeleteForeverIcon /> Clear Clipboard
      </Button>
      <Button
        onClick={handleClear}
        sx={{ display: sessionStorage.getItem('isLoggedIn') ? 'flex' : 'none', flexDirection: 'column' }}
      >
        <DeleteForeverIcon /> Delete Project
      </Button>
    </Box>
  );
};

export default ClipBoard;
