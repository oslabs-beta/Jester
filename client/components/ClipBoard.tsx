import React, { ChangeEvent, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TextField, Box, Button } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import  hljs  from 'highlight.js';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import {
  setServer,
  getSnippets,
  clearClipboardState,
} from '../redux/reducers/ClipBoardReducers';
import ClipboardButton from './ClipboardButton';
import { deleteProject } from '../redux/reducers/userInfoSlice';

/*
This component will display code snippets from a given project in the database if a 
user is logged in, or from state if a user is not logged in
*/

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

  const testStr = 'const request = require(\'supertest\');\nconst server = \'\';\n  \ndescribe(\'Route Integration Testing\', ( ) => {\n  describe(\'/colorizeme\', () => {\n    describe(\'GET\', () => {\n      it(\'responds with status 111\', async () => {\n        const response = await request(server)\n          .get(\'/colorizeme\');\n        expect(response.statusCode).toBe(111);\n      });\n    });\n  });\n  describe(\'/login\', () => {\n   describe(\'GET\', () => {\n    it(\'responds with status 444\', async () => {\n     const response = await request(server)\n     .get(\'/login\');\n      expect(response.statusCode).toBe(444);\n    });\n   });\n  });\n  describe(\'/login\', () => {\n   describe(\'GET\', () => {\n    it(\'responds with status 333\', async () => {\n     const response = await request(server)\n     .get(\'/login\');\n      expect(response.statusCode).toBe(333);\n    });\n   });\n  });\n  describe(\'/login\', () => {\n   describe(\'GET\', () => {\n    it(\'responds with status 222\', async () => {\n     const response = await request(server)\n     .get(\'/login\');\n      expect(response.statusCode).toBe(222);\n    });\n   });\n  });\n});';
  
  console.log('color', testStr);
  const testStrStringify = JSON.stringify(testStr);
  console.log('color stringify', testStrStringify);

  console.log('nocolor', codeDisplay);
  const codeDisplayStringify = JSON.stringify(codeDisplay);
  console.log('nocolor stringify', codeDisplayStringify);

  console.log(testStr === codeDisplay);
  console.log(testStrStringify === codeDisplayStringify);
  

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
            backgroundColor: '#011E3C',
            p: 3,
          }}
        >
          <div id="main-clipboard">
            <pre>
              <code className='javascript' id="code-display">
                {testStr}
              </code> 
            </pre>
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
