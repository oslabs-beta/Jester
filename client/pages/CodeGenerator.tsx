import React from 'react';
import { TestInputForm } from '../components/TestInputForm';
import CodeContainer from '../containers/CodeContainer';
import SaveDataContainer from '../containers/SaveDataContainer';

export const CodeGenerator = () => {
  return (
    <div className='page-body'>
      <TestInputForm />
      <CodeContainer />
      <SaveDataContainer open={true} />
    </div>
  );
};
