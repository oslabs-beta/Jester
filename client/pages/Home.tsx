import React from 'react';
import { Header } from '../components/Header';
import CodeContainer from '../containers/CodeContainer';
import ButtonContainer from '../containers/ButtonContainer';

const Home = () => {
  return (
    <React.Fragment>
      <Header />
      <CodeContainer />
      <ButtonContainer />
    </React.Fragment>
  );
};

export default Home;
