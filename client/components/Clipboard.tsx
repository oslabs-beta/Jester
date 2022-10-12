import hljs from 'highlight.js/lib/common';
import React, { ChangeEvent, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import { useAppDispatch, useAppSelector } from '../redux/hooks';
import {
  clearClipboardState, getSnippets, setServer, setSnippets
} from '../redux/reducers/clipboardSlice';
import { deleteProject } from '../redux/reducers/userInfoSlice';
import { ClipboardButton } from './ClipboardButton';

/*
This component will display code snippets from a given project in the database if a 
user is logged in, or from state if a user is not logged in
*/

export const Clipboard = () => {
  hljs.configure({
    ignoreUnescapedHTML: true
  });
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const projectId = Number(useParams().projectId);
  const isLoggedIn = sessionStorage.getItem('isLoggedIn');
  const buttonText = isLoggedIn ? 'Delete Project' : 'Clear Clipboard';

  const server: string = useAppSelector((state) => state.clipboard.server);
  const codeDisplay: string = useAppSelector(
    (state) => state.clipboard.codeDisplay
  );

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
      // fetch code snippets from db if user logged in
      dispatch(getSnippets(projectId));
    }
    else {
      const clipboardData = sessionStorage.getItem('codeSnippets');
      if (clipboardData) dispatch(setSnippets(JSON.parse(clipboardData)));
    }
    hljs.highlightAll();
  });

  return (
    <div className="page-body">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '10px',
          width: .8,
        }}
        className="code-container"
      >
        <TextField
          className="text-display"
          label="Server URL"
          sx={{ minWidth: 200 }}
          value={server}
          error={server === ''}
          onChange={updateServer}
        />
        <Box 
          sx={{ 
            width: 1,
            height: 500,
            overflow: 'auto',
            backgroundColor: '#282C34',
          }}
        >
          <div id="main-clipboard">
            <pre>
              <code className='javascript'>
                {codeDisplay}
              </code> 
            </pre>
          </div>
        </Box> 
        <ClipboardButton />
        <Button
          onClick={handleClear}
          sx={{ flexDirection: 'column' }}
        >
          <DeleteForeverIcon /> 
          {buttonText}
        </Button>
      </Box>
    </div>
  );
};