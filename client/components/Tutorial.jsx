import React from 'react';
import { Typography } from '@mui/material';

export const Tutorial = () => {
  return (
    <div>
      <Typography variant="h4" component="h2">
        You will need to create a __tests__ folder in your project with a file
        called supertest.js. You will also need to add jest and supertest as
        dependencies in your package.json file.
      </Typography>
      <Typography variant="h4" component="h2">
        You will need to add the following to your supertest.js file:
      </Typography>
      <code>
        const &#123; 'response' &#125; = require('express')<br></br>
        const request = require('supertest')<br></br>
        const server = '
        <em>
          <u>Place server information here</u>
        </em>
        ' <br></br>
      </code>
    </div>
  );
};
