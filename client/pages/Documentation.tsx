import React from 'react';
import { buttons } from '../assets/buttons.png';
// import { Typography } from '@mui/material';

const Documentation = () => {
  return (
    <div className='page-body'>
      <div className='documentation-container'>
        {/* <Typography variant='h5' component='p'> */}
        <p className="documentation-headers">Getting started</p>
        <p className="documentation-p">To start generating a test, simply navigate to our home page, where you will first be prompted to specify the endpoint for your request. </p>
        <p className="documentation-p">This can be a url or a local endpoint like ‘/‘, ‘/users’, etc. </p>
        <p className="documentation-p">At this stage you will also have the option to input a request body to specify the nature of your request (available to all requests types except GET.</p>
        <p className="documentation-p">Once these initial parameters have been satisfied to the necessary extent for your project, you can add assertions to your test by clicking the ‘+’ button next to ‘Add Expected Response’. By default, Jester will populate assertion types in the following order: </p>
        <ol className="documentation-p">
          <li>1. expected status code (100-511)         
            <li>
          2. expected content type (text/html, application/json, etc.)   
            </li>
            <li>
          3. Expected response body (optional)</li>
          </li>
        </ol>
        <p className="documentation-p"> You are allowed a maximum of one of each assertion type. Once all of your specifications are in place, click ‘Generate Test Code’ and your new test will appear in the code block below!</p>
        <p className="documentation-headers">Saving your work</p>
        <p className="documentation-p">The code block where your tests are displayed also has 2 buttons in the top right corner.</p>
        <img className="docs-display" src={buttons}></img>
        <p className="documentation-headers">Integrating tests into your codebase</p>
        <p className="documentation-p"></p>
        <p className="documentation-p"></p>
          
        {/* <ol>
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
          </ol> */}
        {/* </Typography> */}
      </div>
      
    </div>
  );
};

export default Documentation;
