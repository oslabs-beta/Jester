import React from 'react';
import { Typography } from '@mui/material';

const Documentation = () => {
  return (
    <div className='page-body'>
      <div className='documentation-container'>
        <Typography variant='h4' component='h2'>
          <ol>
            <li>
            Create a __tests__ folder in your project with a file called
            supertest.js
            </li>
            <li>
            Add jest and supertest as dependencies in your package.json file
            </li>
            <li>
            Add the following to your supertest.js file:
              <ul>
                <li>
                  <code>const &#123; response &#125; = require('express')</code>
                </li>
                <li>
                  <code>const request = require('supertest')</code>
                </li>
                <li>
                  <code>
                  const server = '
                    <em>
                      <u>Place server information here</u>
                    </em>
                  '
                  </code>
                </li>
              </ul>
            </li>
          </ol>
        </Typography>
      </div>
      
    </div>
  );
};

export default Documentation;
