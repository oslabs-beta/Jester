import React from 'React';
import { Provider } from 'react-redux';
import { fireEvent, render, screen } from '@testing-library/react';
import configureStore from 'redux-mock-store';


import '@testing-library/jest-dom';

import ClipBoard from '../../client/components/ClipBoard';
import ClipboardButton from '../../client/components/ClipboardButton';
import { BrowserRouter } from 'react-router-dom';


const initialState = {
  // //should this be slice1 instead of base slice?
  slice1: {
    codeOutput1: 'describe(\'Sample description\')',
  },
  slice: {
    doneIcon1: 'describe()'
  }
};
const mockStore = configureStore();

/* What do we want CB to ideally do?

- First it should render.
- Second it should display default text: 'Your Clipboard is currently empty!\nPlease generate a test before we can display your testing code here.'
- Display copy button on hover.
- 

*/

/* So how to do React Unit testing?

- Step 1: create initial state.
- Step 2: create a mock store
- Step 3: create component to test on!
- Step 4: check that component does what we want.

*/



const board = () => {
  render(
    <Provider store={mockStore(initialState)}>
      <BrowserRouter>
        <ClipBoard />
      </BrowserRouter>
    </Provider>  
  );
};

const dButton = () => {
    render(
      <Provider store={mockStore(initialState)}>
        <BrowserRouter>
          <? />
        </BrowserRouter>
      </Provider>  
    );
  };
  



describe('Unit testing Clipboard component', () => {
//   beforeAll(() => {
//   });
  //So now our text block. We should use a .toBeInTheDocument() to test if it is rendering.
  //could get element by role instead since it is test field. textbox, {name: name of textbox}
  test(`Renders a Clipboard with the role of ${'textbox'}`, () => {
    board();
    expect(screen.getByRole('textbox', {name:''})).toBeInTheDocument();
  });
  // Three more things we could unit test for: server url textbox, delete button, copy button.
  //delete button:
  test(`Renders the delete button with an identity of ${'main-clipboard'}`, () => {
    dButton();
    expect(screen.getByRole('textbox', {name:''})).toBeInTheDocument();
  });
  // copy button.
  test(`Renders the copy button with an identity of ${'main-clipboard'}`, () => {
    dButton();
    expect(screen.getByRole('textbox', {name:''})).toBeInTheDocument();
  });
  // server url textbox
  test(`Renders the server url textbox ${'main-clipboard'}`, () => {
    dButton();
    expect(screen.getByRole('textbox', {name:''})).toBeInTheDocument();
  });
});