import React from 'react';
import { Button } from '@mui/material';
import axios from 'axios'
import { useAppDispatch } from '../redux/hooks';
import {setClipboardData} from '../redux/reducers/userInfoSlice'

type projectProps = {
  name: string,
  projectId: number,
};

export const Project = (props: projectProps) => {
  const dispatch = useAppDispatch();
  const handleClick = async () => {    
    const clipboardData = await axios.get(`/api/clipboard/${props.projectId}`);
    dispatch(setClipboardData({projectId: props.projectId, clipboardData: clipboardData.data}));
    };
  return <Button onClick={handleClick}>{props.name}</Button>;
};
