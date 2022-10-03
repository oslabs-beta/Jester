import axios from 'axios'; // to be used by handleClear
import React, { ChangeEvent, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TextField, Box, Button } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { userEditText } from '../redux/reducers/ClipBoardReducers';
import ClipboardButton from '../containers/ClipboardButton';
import {
  setCodeOutput1,
  setServer,
  clearCodeSnippets, // to be used by handleClear
} from '../redux/reducers/ClipBoardReducers';


const ClipBoard = () => {
  const navigate = useNavigate(); // to be used by handleClear
  const dispatch = useAppDispatch();
  const { projectId } = useParams();

  const codeOutput1: string = useAppSelector((state) => state.slice1.codeOutput1);
  const server: string = useAppSelector((state) => state.slice1.server);
  const codeOutputEdited1: string | undefined = useAppSelector(
    (state) => state.slice1.codeOutputEdited1
  );

  const editCode = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    dispatch(userEditText(e.target.value));
    
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
    if (sessionStorage.getItem('isLoggedIn')) {
      fetch(`/Api/Clipboard/${projectId}`)
        .then((response) => response.json())
        .then((response) => dispatch(setCodeOutput1(response)))
        .catch((err) => console.log(err));
    }
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
