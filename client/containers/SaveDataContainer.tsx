import React, { ChangeEvent } from 'react';
import { Button, Box, Dialog, DialogTitle, Stack, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';

import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { ProjectDropdown } from '../components/ProjectDropdown';
import { setShowSave, setCurrentProject, setNewProject } from '../redux/reducers/userInfoSlice';

type saveDataPropsType = {
  open: boolean;
};

const SaveDataContainer = (props: saveDataPropsType) => {
  const newProject = useAppSelector((state) => state.userInfo.newProject); // project from input
  const selectedProject = useAppSelector((state) => state.userInfo.currentProject); // project from dropdown
  const disableDropdown = Boolean(newProject.length);

  const dispatch = useAppDispatch();
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    dispatch(setNewProject(e.target.value));
    dispatch(setCurrentProject(e.target.value));
  };
  const handleDiscard = () => {
    // Need to write functionality to handle the discard
    dispatch(setShowSave());
  };
  const handleSave = () => {
    // Need to write functionality to handle the save
    dispatch(setShowSave());
  };

  return (
    <Dialog
      // onClose={ handleClose } 
      open={props.open}
    >
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: 325
      }}>
        <Box sx={{
          width: 500,
          display: 'flex',
          flexDirection: 'row',
          backgroundColor: '#5E17EB',
          justifyContent: 'center'
        }}>
          <img alt="logo" src="../assets/logo-jester.png" />
        </Box>
        <DialogTitle>Would you like to save your current clipboard?</DialogTitle>
        <Box>
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
      </Box>
    </Dialog>
  );
};


export default SaveDataContainer;
