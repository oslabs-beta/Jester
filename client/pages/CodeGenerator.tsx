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
      <TestInputForm />
      <CodeContainer />
      <SaveDataContainer open={showSave} />
    </div>
  );
};
