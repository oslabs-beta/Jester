import React from 'react';
import { Header } from '../components/Header';
import CodeContainer from '../containers/CodeContainer';

export const CodeGenerator = () => {
  return (
    <div className='page-body'>
      <Header />
      <CodeContainer />
    </div>
  );
};
