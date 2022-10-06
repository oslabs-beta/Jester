import React from 'react';
import { TestInputForm } from '../components/TestInputForm';
import CodeContainer from '../containers/CodeContainer';

export const CodeGenerator = () => {
  return (
    <div className='page-body'>
      <TestInputForm />
      <CodeContainer />
    </div>
  );
};
