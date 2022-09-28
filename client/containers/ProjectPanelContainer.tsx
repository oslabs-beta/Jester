import { Box, Button, Typography } from '@mui/material';
import React from 'react';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { setShowAddProject } from '../redux/reducers/navPanelSlice';
import { AddProjectDialog } from '../components/AddProjectDialog';
import { Project } from '../components/Project';

export const ProjectPanelContainer = () => {
  
  const dispatch = useAppDispatch();
  const showProjectPanel = useAppSelector(
    (state) => state.navPanel.showProjectPanel
  );
  type projectsType = {
    project_id: number,
    project_name: string,
    user_id: number,
    clipboardInfo?: string[]
  }
  const projectName: projectsType[] = useAppSelector((state) => state.userInfo.projectsInfo);
  const projects: JSX.Element[] = [];
  projectName.forEach(project => {
    projects.push(<Project key={project['project_id']} name={project['project_name']} projectId={project['project_id']} />)
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
