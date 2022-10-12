import React from 'React';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import '@testing-library/jest-dom';
import ClipBoard from '../../client/components/ClipBoard';
import ClipboardButton from '../../client/components/ClipboardButton';
import { BrowserRouter } from 'react-router-dom';

const initialState = {
  // create this state to be a copy of the default state you expect for your component/s
  clipboard:{
    server: '',
  }
};

const mockStore = configureStore();

/* A poor man's guide on how to do React Unit testing:
- Step 1: create initial state.
- Step 2: create a mock store
- Step 3: create component to test on!
- Step 3.5: If necessary, create a secondary state if the button is reliant on some change in state
- Step 4: check that component does what we want. (obviously it's not this simple)
*/


// the board is going to represent the main clipboard where the code snippet will be displayed.
// to test this, I just need to render a board and check if there is a text-field with the role/id matching.

// the server url text box is being rendered as a textfield in the Clipboard component.
// How do I access this box by itself to see if it's in the document?

// the delete button is rendered inside of the Clipboard component as a button with no id (but has the delete button icon).
// let's render the board, and examine it to see if there is a button in the document - this should be the simplest test of the four.
const board = () => {
  render(
    <Provider store={mockStore(initialState)}>
      <BrowserRouter>
        <ClipBoard />
      </BrowserRouter>
    </Provider>  
  );
};

// the copy to clipboard button is its own component that I can just import to check if it exists in the document.
// problem here is that due to css styling, it only appears on a hover. So to test it appears on hover, I need to somehow convince this test file that the CSS hover property is true.
const cbButton = () => {
  render(
    <Provider store={mockStore()}>
      <BrowserRouter>
        <ClipboardButton />
      </BrowserRouter>
    </Provider>  
  );
};

describe('Unit testing Clipboard component', () => {
  // It's important to understand the difference betweem beforeAll and beforeEach when writing multiple tests that rely on a single component being rendered!
  beforeEach(() => {
    board();
  /* Nothing else to do here as no changes in state are necessary. If a component is introduced that requires a
  change in state then to test properly, you will need to reset the state before wach test to ensure that the
  components being rendered in the test have the expected default state.
  
  A similar feature could be achievd through the use of a fireEvent.click method (in this case) being run before each event
  where we want to change state based on a button being clicked!
  */
  });

  // clipboard that displays snippets
  test(`Renders a Clipboard with the classname of ${'code-container'}`, () => {
    expect(screen.getByTestId('code-container')).toBeInTheDocument();
  });
  //delete button:
  test(`Renders the delete button with the classname of ${'delete'}` , () => {
    expect(screen.getByRole('button', { name:'Clear Clipboard' })).toBeInTheDocument();
  });
  // copy button.
  test(`Renders the copy button with a class name of ${'clipboard-button-container'}`, () => {
    cbButton();
    // how to test as if the css hover property is true? --> this is actually unnecessary as it is being rendered, just not visible until hovered over.
    expect(screen.getByRole('button', { name: 'something-weird' })).toBeInTheDocument();
  });
  // server url textbox
  test(`Renders the server url textbox with a label of ${'Server URL'}`, () => {
    expect(screen.getByRole('textbox', { name:'Server URL' })).toBeInTheDocument();
  });
});

// npm test __tests__/React\ Unit\ Testing/CB.tsx