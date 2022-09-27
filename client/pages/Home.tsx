import React from 'react';
import { Header } from '../components/Header';
import CodeContainer from '../containers/CodeContainer';
import ButtonContainer from '../containers/ButtonContainer';

const Home = () => {
  return (
    <div id="page-body">
      <Header />
      <CodeContainer />
      <ButtonContainer />
    </div>
  );
};

export default Home;
