import React from 'react';

import AddCardIcon from '@mui/icons-material/AddCard';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import { AddProjectDialog } from '../components/AddProjectDialog';
import { Project } from '../components/Project';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { setShowAddProject } from '../redux/reducers/navPanelSlice';

/*
This component displays the second column of the nav panel that provides a user with navigation
to each of their project's clipboards, as well as with the ability to delete any project,
and the ability to add a project.
*/

export const ProjectPanelContainer = () => {
  const dispatch = useAppDispatch();
  const showProjectPanel = useAppSelector(
    (state) => state.navPanel.showProjectPanel
  );
  type projectsType = {
    project_id: number;
    project_name: string;
    user_id: number;
    clipboardInfo?: string[];
  };
  const projectName: projectsType[] = useAppSelector(
    (state) => state.userInfo.projectsInfo
  );
  const projects: JSX.Element[] = [];
  projectName.forEach((project) => {
    projects.push(
      <Project
        key={project['project_id']}
        name={project['project_name']}
        projectId={project['project_id']}
      />
    );
    projects.push(<hr className="divider"/>);
  });
  projects.pop();
  const handleAddProject = () => {
    dispatch(setShowAddProject());
  };
  return (
    <Box
      className="panel project-panel-container"
      sx={{
        width: '100px',
        display: showProjectPanel ? 'flex' : 'none',
        flexDirection: 'column',
      }}
    >
      <Button onClick={handleAddProject} sx={{ display: 'flex', flexDirection: 'column' }}><AddCardIcon />Add New Project</Button>
      <hr className="divider"/>
      {projects}
        
      <AddProjectDialog />
    </Box>
  );
};
