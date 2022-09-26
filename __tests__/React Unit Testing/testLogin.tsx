import React from 'React';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

import { Login } from '../../client/components/Login';



const initialState = {};

const mockStore = configureStore()

const login = () => {
  render(
    <Provider store={mockStore(initialState)}>
      <Login open={true}/>
    </Provider>
  );
};

describe('Unit testing Login component', () => {
  beforeEach(() => {
    login();
  })
  test('it renders login dialog box', () => {
    expect(screen.getByRole('dialog', {name: /sign in with/i})).toBeInTheDocument();
  })
  test('it renders logo', () => {
    expect(screen.getByRole('img', {name: /logo/i})).toBeInTheDocument();
  })
  test('it renders github sign-in button', () => {
    expect(screen.getByTestId('GitHubIcon')).toBeInTheDocument();
  })
})
