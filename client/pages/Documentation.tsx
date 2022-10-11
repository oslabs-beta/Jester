import React from 'react';
import { photosObj } from '../assets/photosObj';

const Documentation = () => {
  return (
    <div className='page-body'>
      <div className='documentation-container'>
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
        <img className="docs-display" src={photosObj.buttons}></img>
        <p className="documentation-p">The first is a copy-to-clipboard button which will enable you to copy the entire block of code to paste wherever you wish. The second is the ‘add to project’ button available to logged-in users.</p>
        <p className="documentation-p">
          There is an option to login with Github. If you are logged in, then you will be able to create saved projects 
          under ‘Projects’ and add your generated test code snippets to whatever project you specify. An ‘Add to Project’ 
          dropdown will appear underneath the ‘Generate Test Code’ button for logged in users. To add a test code snippet to 
          a project, select your desired project from this drop-down menu and then click the second button in the upper right 
          corner of the code block. You can view your saved projects in the 'Projects' tab.</p>
        <p className="documentation-headers">Integrating tests into your codebase</p>
        <ol className="documentation-p">
          <li>
            Create a __tests__ folder in your project with a file called
            supertest.js
          </li>
          <li>
            Add jest and supertest as dependencies in your package.json file
          </li>
          <li>
            Paste generated code into the file supertest.js
          </li>
        </ol>
      </div>
      
    </div>
  );
};

export default Documentation;
