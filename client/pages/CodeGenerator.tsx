import React from 'react';
import { TestInputForm } from '../components/TestInputForm';
import CodeContainer from '../containers/CodeContainer';
import SaveDataContainer from '../containers/SaveDataContainer';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { setShowSave } from '../redux/reducers/userInfoSlice';

export const CodeGenerator = () => {
  const showSave = useAppSelector((state) => state.userInfo.showSave);

  return (
    <div className='page-body'>
      <TestInputForm />
      <CodeContainer />
      <SaveDataContainer open={ showSave } />
    </div>
  );
};
