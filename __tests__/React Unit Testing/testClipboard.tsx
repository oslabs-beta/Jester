import React from 'React';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import '@testing-library/jest-dom';
import { Clipboard } from '../../client/components/Clipboard';
import { BrowserRouter } from 'react-router-dom';

const initialState = {
  clipboard:{
    server: '',
  }
};

const mockStore = configureStore();

const board = () => {
  render(
    <Provider store={mockStore(initialState)}>
      <BrowserRouter>
        <Clipboard />
      </BrowserRouter>
    </Provider>  
  );
};

describe('Unit testing Clipboard component', () => {
  beforeEach(() => {
    board();
  });

  test(`Renders a Clipboard with the classname of ${'code-container'}`, () => {
    expect(screen.getByTestId('code-container')).toBeInTheDocument();
  });
  test(`Renders the delete button with the classname of ${'delete'}` , () => {
    expect(screen.getByRole('button', { name:'Clear Clipboard' })).toBeInTheDocument();
  });
  test(`Renders the copy button with a class name of ${'clipboard-button-container'}`, () => {
    expect(screen.getByTestId('bttn-copy')).toBeInTheDocument();
  });
  test(`Renders the server url textbox with a label of ${'Server URL'}`, () => {
    expect(screen.getByRole('textbox', { name:'Server URL' })).toBeInTheDocument();
  });
});