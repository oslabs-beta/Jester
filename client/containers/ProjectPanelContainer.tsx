import { Box, Button } from '@mui/material';
import React from 'react';
import AddCardIcon from '@mui/icons-material/AddCard';
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
  if (showProjectPanel)
    return (
      <Box
      className="panel project-panel-container"
        sx={{
          width: '100px',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Button onClick={handleAddProject} sx={{ display: 'flex', flexDirection: 'column' }}><AddCardIcon />Add New Project</Button>
        <hr className="divider"/>
        {projects}
        
        <AddProjectDialog />
      </Box>
    );
  else return null;
};
