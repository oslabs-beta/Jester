import React from 'react';
import { Button, Box, Dialog, DialogTitle, Stack, TextField, Typography } from '@mui/material';
import { ProjectDropdown } from '../components/ProjectDropdown';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';

type saveDataPropsType = {
  open: boolean;
};

const SaveDataContainer = (props: saveDataPropsType) => {
  return (
    <Dialog 
      // onClose={ handleClose } 
      open={ props.open }
    >
      <Box sx={{
        display: 'flex',
        flexDirection: 'column', 
        alignItems: 'center',
        height: 300
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
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <ProjectDropdown />
          <TextField
            label="New Project Name"
            data-testid="new-project"
            id="new-project"
            size="small"
            sx={{ width: 200, marginBottom: 2 }}
          />
          <Stack direction="row" spacing={ 2 } sx={{ marginBottom: 2 }}>
            <Button variant="outlined" startIcon={ <DeleteIcon /> } sx={{ width: 120 }}>
              Discard
            </Button>
            <Button variant="outlined" startIcon={ <SaveIcon /> } sx={{ width: 120 }}>
              Save
            </Button>
          </Stack>
        </Box>
      </Box>
    </Dialog>
  );
};


export default SaveDataContainer;
