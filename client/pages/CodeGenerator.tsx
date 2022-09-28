import React from 'react';
import { useParams } from 'react-router-dom';
import { Header } from '../components/Header';
import ButtonContainer from '../containers/ButtonContainer';
import CodeContainer from '../containers/CodeContainer';


export const CodeGenerator = () => {

    return (
      <div>
        <Header />
        <CodeContainer />
        <ButtonContainer />
      </div>
    );
};
