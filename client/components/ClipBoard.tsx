import React, { ChangeEvent, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TextField, Box, Button, Paper } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import { useAppDispatch, useAppSelector } from '../redux/hooks';
import {
  setServer,
  getSnippets,
  clearClipboardState,
} from '../redux/reducers/ClipBoardReducers';
import ClipboardButton from './ClipboardButton';
import { deleteProject } from '../redux/reducers/userInfoSlice';

const ClipBoard = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const projectId = Number(useParams().projectId);
  const isLoggedIn = sessionStorage.getItem('isLoggedIn');
  const buttonText = isLoggedIn ? 'Delete Project' : 'Clear Clipboard';

  const server: string = useAppSelector((state) => state.clipboard.server);
  const codeDisplay: string = useAppSelector(
    (state) => state.clipboard.codeDisplay
  );

  const elementArr: JSX.Element[] = [];
  codeDisplay.split('\n').forEach((el) => {
    console.log(el);
    elementArr.push(
      <pre>
        { el }
      </pre>
    );
  });
  

  const updateServer = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setServer(e.target.value));
  };

  const handleClear = () => {
    if (isLoggedIn) {
      dispatch(deleteProject(projectId));
      navigate('/');
    } else {
      dispatch(clearClipboardState());
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getSnippets(projectId));
    }
  });

  return (
    <div className="page-body">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '10px',
          width: 800,
        }}
        className="code-container"
      >
        <TextField
          className="text-display"
          label="Server URL"
          sx={{ width: '300px' }}
          value={server}
          error={server === ''}
          onChange={updateServer}
        ></TextField>
        <Box 
          sx={{ 
            width: 800, 
            minHeight: 400, 
            overflow: 'auto',
            color: 'white',
            backgroundColor: '#011E3C',
            p: 3,
          }}
        >
          <div id="main-clipboard">
            { elementArr }
          </div>
        </Box> 
        <ClipboardButton />
        <Button
          onClick={handleClear}
          sx={{
            flexDirection: 'column',
          }}
        >
          <DeleteForeverIcon /> {buttonText}
        </Button>
      </Box>
    </div>
  );
};

export default ClipBoard;
