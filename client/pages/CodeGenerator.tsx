import { Typography } from '@mui/material';
import React from 'react';

import { TestInputForm } from '../components/TestInputForm';
import { CodeContainer } from '../containers/CodeContainer';
import { SaveDataContainer } from '../containers/SaveDataContainer';
import { useAppSelector } from '../redux/hooks';

export const CodeGenerator = () => {
  const showSave = useAppSelector((state) => state.userInfo.showSave);

  return (
    <div className='page-body'>
      <Typography variant="h3" gutterBottom align='center' sx={{ color: '#6E00BB', mb: 3, mt: 2 }}>Test Generator</Typography>
      <TestInputForm />
      <CodeContainer />
      <SaveDataContainer open={showSave} />
    </div>
  );
};
