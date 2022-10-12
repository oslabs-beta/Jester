import React from 'react';

import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { setCurrentProject } from '../redux/reducers/userInfoSlice';

type projectDropdownPropsType = {
  allowNew?: boolean;
  disabled?: boolean;
};

/*
This component creates a dropdown menu with all of the project names that are tied to a user so that
  1) a user can indicate which project they want the generated test code snippet to be added to
  2) a user can select which project they want their clipboard data reconciled to
*/

const ProjectDropdown = (props: projectDropdownPropsType) => {
  const dispatch = useAppDispatch();
  const projectName = useAppSelector((state) => state.userInfo.currentProject);
  const projectsInfo = useAppSelector((state) => state.userInfo.projectsInfo);
  const projects = projectsInfo.map((el) => el.project_name);

  const handleChange = (e: SelectChangeEvent<string>) => {
    dispatch(setCurrentProject(e.target.value));
  };

  const menuItems: JSX.Element[] = [];
  for (const project of projects) {
    menuItems.push(
      <MenuItem key={project} value={project}>
        {project}
      </MenuItem>
    );
  }

  return (
    <Box
      sx={{
        minHeight: 25,
        height: 25,
        width: 23,
        minWidth: 200,
        m: 3,
      }}
    >
      <FormControl fullWidth>
        <InputLabel id="project-dropdown-label">Project</InputLabel>
        <Select
          name="project-selector"
          id="project-selector"
          data-testid="project-selector"
          label="Project"
          value={projectName}
          onChange={handleChange}
          sx={{ height: 40 }}
          disabled={props.disabled}
        >
          {menuItems}
        </Select>
      </FormControl>
    </Box>
  );
};

export { ProjectDropdown };
