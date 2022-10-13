import axios from 'axios';
import React, { ChangeEvent } from 'react';

import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';

import { ProjectDropdown } from '../components/ProjectDropdown';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { postSnippet } from '../redux/reducers/clipboardSlice';
import {
  setCurrentProject, setNewProject, setProjectsInfo, setShowSave
} from '../redux/reducers/userInfoSlice';

type saveDataPropsType = {
  open: boolean;
};

/*
This component allows a user to reconcile the clipboard test data that they made 
while not logged in with a project stored in the database once they do login.
*/

export const SaveDataContainer = (props: saveDataPropsType) => {
  const newProject = useAppSelector((state) => state.userInfo.newProject);
  const selectedProject = useAppSelector(
    (state) => state.userInfo.currentProject
  );
  const projects = useAppSelector((state) => state.userInfo.projectsInfo);
  const disableDropdown = Boolean(newProject.length);

  const dispatch = useAppDispatch();
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    dispatch(setNewProject(e.target.value));
    dispatch(setCurrentProject(e.target.value));
  };
  const handleDiscard = () => {
    sessionStorage.removeItem('clipboardData');
    dispatch(setShowSave());
  };
  const handleSave = async () => {
    let snippets: string[] = [];
    if (sessionStorage.getItem('clipboardData')) {
      const storedSnippets = sessionStorage.getItem('clipboardData');
      if (storedSnippets) snippets = JSON.parse(storedSnippets);
    }
    if (newProject !== '') { 
      // add saved code snippets to a new project
      const response = await axios.post('api/project/', {
        project_name: newProject,
      });
      const projects = response.data;
      dispatch(setProjectsInfo(response.data));
      dispatch(
        postSnippet({
          projectId: projects[projects.length - 1]['project_id'],
          codeOutput: snippets,
        })
      );
    } else { 
      // add saved code snippets to a pre-existing project
      for (const project of projects) {
        if (project.project_name === selectedProject) {
          dispatch(postSnippet({ projectId: project.project_id, codeOutput: snippets }));
          break;
        }
      }
    }
    sessionStorage.removeItem('clipboardData');

    dispatch(setShowSave());
  };

  return (
    <Dialog
      open={props.open}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          height: 325,
        }}
      >
        <Box
          sx={{
            width: 500,
            display: 'flex',
            flexDirection: 'row',
            backgroundColor: '#6e00bb',
            justifyContent: 'center',
          }}
        >
          <img alt="logo" src="../assets/logo-jester.png" />
        </Box>
        <DialogTitle>
          Would you like to save your current clipboard?
        </DialogTitle>
        <ProjectDropdown disabled={disableDropdown} />
        <TextField
          label="New Project Name"
          data-testid="new-project"
          id="new-project"
          size="small"
          sx={{ width: 200, minWidth: 200, marginBottom: 2 }}
          onChange={handleChange}
        />
        <Stack direction="row" spacing={2}>
          <Button
            variant="outlined"
            startIcon={<DeleteIcon />}
            sx={{ width: 120 }}
            onClick={handleDiscard}
          >
              Discard
          </Button>
          <Button
            variant="outlined"
            startIcon={<SaveIcon />}
            sx={{ width: 120 }}
            onClick={handleSave}
          >
              Save
          </Button>
        </Stack>
      </Box>
    </Dialog>
  );
};
