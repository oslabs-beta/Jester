import React from 'react';
import { Button, Box } from '@mui/material';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import { useAppDispatch } from '../redux/hooks';
import { setShowAccessClipboard } from '../redux/reducers/userInfoSlice';
import { AccessClipboardDisplay } from './AccessClipboardDisplay';

type projectProps = {
  name: string;
  projectId: number;
};

export const Project = (props: projectProps) => {
  const dispatch = useAppDispatch();
  const handleClick = async () => {
    dispatch(setShowAccessClipboard(props.projectId));
  };
  return (
    <Box>
      <Button onClick={handleClick} sx={{ display: 'flex', flexDirection: 'column' }}><CreditCardIcon />{props.name}</Button>
      <AccessClipboardDisplay projectId={props.projectId} />
    </Box>
  );
};
