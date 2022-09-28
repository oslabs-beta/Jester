import React from 'react';
import { CodeGenerator } from './CodeGenerator';

const Home = () => {
  return (
    // if a user is not logged in, show this
      <CodeGenerator />
    // if a user is logged in, route to /CodeGenerator/:projectId -> for the first project?
      // or it could display a page with the projects listed for the user to choose from
      // or it could link back to the code generator for that given project
      // or something else 
  );
};

export default Home;
