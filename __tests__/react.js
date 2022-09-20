import React from 'React';
import { Provider } from 'react-redux';
import { fireEvent, render, screen } from '@testing-library/react';
import Button from '@mui/material/Button';

import CodeContainer from '../client/containers/CodeContainer';
import ButtonContainer from '../client/containers/ButtonContainer';

import configureStore from 'redux-mock-store'
import '@testing-library/jest-dom'

const initialState = {slice: {
  codeOutput: `describe('Sample description')`,
}};
const mockStore = configureStore()

const code = () => {
  render(
    <Provider store={mockStore(initialState)}>
      <CodeContainer/>
    </Provider>,
  );
}

const button = () => {
  render(
    <Provider store={mockStore(initialState)}>
      <ButtonContainer/>
    </Provider>,
  );
}

beforeEach(() => {
})


describe('Unit testing Output Container components', () => {

  test('Renders placeholder code output in Code Container', () => {
    code();
    const codeOutput = screen.getByLabelText('Testing Code');
    expect(codeOutput.innerHTML).toEqual(`describe('Sample description')`);
  }),
  

  test('Renders copy to clipboard button', () => {
    button();
    const bttn = screen.getByRole('button', { name: '' });
    expect(bttn).toBeInTheDocument();
  }),

  test('Renders ContentCopyIcon inside button', () => {
    button();
    const copyIcon = bttn.innerHTML.includes('data-testid=\"ContentCopyIcon\"');
    expect(copyIcon).toBeTruthy();
  }),

  test('Renders DoneAllIcon on button click', () => {
    button();
    let bttn = screen.getByRole('button', { name: '' });
    fireEvent.click(bttn)
    bttn = screen.getByRole('button', { name: '' });
    const checkIcon = bttn.innerHTML.includes('data-testid=\"DoneAllIcon\"');
    expect(checkIcon).toBeTruthy();
  }),


  xtest('Button onclick changes icon and copies base text to clipboard', () => {
  }),

  xtest('State is updated when user types in text box', () => {
    // const TYPED_TEXT = 'new user typed text';
    // let state = store.setState();
    // let codeOutput = screen.getByLabelText('Testing Code');
    // expect(codeOutput).toHaveTextContent(TYPED_TEXT);
  }),

  xtest('Button onclick copies edited text to clipboard', () => {
  });

})
