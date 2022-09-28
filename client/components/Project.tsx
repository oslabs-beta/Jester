import React from 'react';
import { Button, Box } from '@mui/material';
import axios from 'axios'
import { useAppDispatch } from '../redux/hooks';
import {setClipboardData} from '../redux/reducers/userInfoSlice'
import { setShowAccessClipboard } from "../redux/reducers/navPanelSlice";
import { AccessClipboardDisplay } from './AccessClipboardDisplay'

type projectProps = {
  name: string,
  projectId: number,
};

export const Project = (props: projectProps) => {
  const dispatch = useAppDispatch();
  const handleClick = async () => {    
    // render clipboard button and generate test code button
    dispatch(setShowAccessClipboard());
    const clipboardData = await axios.get(`/api/clipboard/${props.projectId}`);
    dispatch(setClipboardData({projectId: props.projectId, clipboardData: clipboardData.data}));

    };
  return (
    <Box>
    <Button onClick={handleClick}>{props.name}</Button>
    <AccessClipboardDisplay />
  </Box>
  );
};
