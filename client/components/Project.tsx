import React from 'react';

import CreditCardIcon from '@mui/icons-material/CreditCard';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import { useAppDispatch } from '../redux/hooks';
import { setShowAccessClipboard } from '../redux/reducers/userInfoSlice';
import { NavProjectMenu } from './NavProjectMenu';

type projectProps = {
  name: string;
  projectId: number;
};

/*
This component wraps each project with the corresponding project navigation
menu to enable the project menu dropdown for each individual project
*/

export const Project = (props: projectProps) => {
  const dispatch = useAppDispatch();
  const handleClick = async () => {
    dispatch(setShowAccessClipboard(props.projectId));
  };
  return (
    <Box sx={{ alignItems: 'center', justifyContent: 'center' }}>
      <Button onClick={handleClick} sx={{ display: 'flex', flexDirection: 'column', wordWrap: 'anywhere', width: '100%' }}><CreditCardIcon />
        {props.name}
      </Button>
      <NavProjectMenu projectId={props.projectId} />
    </Box>
  );
};
