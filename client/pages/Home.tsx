import React from 'react';
import { Header } from '../components/Header';
import CodeContainer from '../containers/CodeContainer';

const Home = () => {
  return (
    <div className='page-body'>
      <Header />
      <CodeContainer />
    </div>
  );
};

export default Home;
