import { Box, Button, Typography } from '@mui/material';
import React from 'react';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { setShowAddProject } from '../redux/reducers/navPanelSlice';
import { AddProjectDialog } from '../components/AddProjectDialog';
import { Project } from '../components/Project';

export const ProjectPanel = () => {
// send request to backend to get project names (get request to '/api/project/:userId')
// render buttons for project names
  // add property in state for project names
  // add delete project functionality as button next to name
    // popup to confirm delete
    // send delete request to ('/api/project/:userId')

  

  const dispatch = useAppDispatch();
  const showProjectPanel = useAppSelector(
    (state) => state.navPanel.showProjectPanel
  );
  const projectName: {}[] = useAppSelector((state) => state.userInfo.projectsInfo);
  const projects: JSX.Element[] = [];
  projectName.forEach(project => {
    // projects.push(<Project name={project} />)
  })
  const handleAddProject = () => {
    dispatch(setShowAddProject());
  }
  if (showProjectPanel)
    return (
      <Box
        sx={{
          border: '1px dashed lightgrey',
          width: '100px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <Box sx={{display: 'flex', flexDirection:'column'}}>
        {projects}
        </Box>
        <Button onClick={ handleAddProject }>Add New Project</Button>
        <AddProjectDialog />
      </Box>
    );
  else return null;
};
