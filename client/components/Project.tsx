import React from 'react';
import { Button } from '@mui/material';

type projectProps = {
  name: string;
};

export const Project = (props: projectProps) => {
  const handleClick = () => {    
    // onclick of button will send request to backend to get clipboard data and store data in state
    // data should be stored as an object with key = project name and value = clipboard data
    // '/api/clipboard/
    };

  return <Button onClick={handleClick}>{props.name}</Button>;
};
