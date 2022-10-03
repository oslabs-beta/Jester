import React from 'React';
import { Provider } from 'react-redux';
import { fireEvent, render, screen } from '@testing-library/react';
import configureStore from 'redux-mock-store';

import '@testing-library/jest-dom';

import ClipBoard from '../../client/components/ClipBoard';
import ClipboardButton from '../../client/components/ClipboardButton';


const initialState: any = {
    // //should this be slice1 instead of base slice?
    // slice: {
    //   codeOutput1: 'describe(\'Sample description\')',
    // },
  };
const mockStore: any = configureStore();

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
            <ClipBoard />
        </Provider>  
    )
};



describe('', () => {
    beforeAll(() => {
    });

    //So now our text block. We should use a .toBeInTheDocument() to test if it is rendering.
    test('', () => {
      const codeOutput = screen.getByLabelText('Testing Code');
      expect(codeOutput.innerHTML).toEqual('describe(\'Sample description\')');
    });
};