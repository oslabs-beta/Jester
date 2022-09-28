import React from 'react';
import { Header } from '../components/Header';
import ButtonContainer from '../containers/ButtonContainer';
import CodeContainer from '../containers/CodeContainer';

type codeGeneratorProps = {
  show: boolean;
};

export const CodeGenerator = (props: codeGeneratorProps) => {
  // props.projectId
  // grab show value from state
  
  if (props.show)
    return (
      <div>
        <Header />
        <CodeContainer />
        <ButtonContainer />
      </div>
    );
  else return null;
};
