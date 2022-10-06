import axios from 'axios'; // to be used by handleClear
import React, { ChangeEvent, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TextField, Box, Button } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import { useAppDispatch, useAppSelector } from '../redux/hooks';
import {
  setServer,
  deleteSnippets,
  getSnippets,
  clearClipboardState
} from '../redux/reducers/ClipBoardReducers';
import ClipboardButton from './ClipboardButton';

const ClipBoard = () => {
  const navigate = useNavigate(); // to be used by handleClear
  const dispatch = useAppDispatch();
  const projectId = Number(useParams().projectId);

  const server: string = useAppSelector((state) => state.clipboard.server);
  const codeDisplay: string = useAppSelector((state) => state.clipboard.codeDisplay);
  
  const updateServer = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setServer(e.target.value));
  };

  const handleClear = () => {
    if (sessionStorage.getItem('isLoggedIn')) {
      dispatch(deleteSnippets(projectId));
      navigate('/');
    } else {
      dispatch(clearClipboardState());
    }
  };
  // need to discuss how to implement handleClear

  useEffect(() => {
    dispatch(getSnippets(projectId))
  });

  return (
    <div className="page-body">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '10px',
          width: 800
        }}
        className="code-container"
      >
        <TextField
          label="Server URL"
          sx={{ width: '300px' }}
          value={ server }
          error={ server === '' }
          onChange={ updateServer }
        ></TextField>
        <TextField
          id="main-clipboard"
          multiline
          rows={ 10 }
          value={ codeDisplay }
          sx={{
            width: 0.95,
            fontFamily: 'Source Code Pro'
          }}
        />
        {/* <ClipboardButton /> */}
        <Button
          onClick={ handleClear }
          sx={{
            display: sessionStorage.getItem('isLoggedIn') ? 'none' : 'flex',
            flexDirection: 'column'
          }}
        >
          <DeleteForeverIcon /> Clear Clipboard
        </Button>
        <Button
          onClick={ handleClear }
          sx={{
            display: sessionStorage.getItem('isLoggedIn') ? 'flex' : 'none',
            flexDirection: 'column'
          }}
        >
          <DeleteForeverIcon /> Delete Project
        </Button>
      </Box>
    </div>
  );
};

export default ClipBoard;
