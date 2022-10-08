import React from 'React';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import { Login } from '../../client/components/Login';

const initialState = {};

const mockStore: any = configureStore();

describe('Unit testing Login component', () => {
  beforeEach(() => {
    render(
      <Provider store={mockStore(initialState)}>
        <Login open={true} />
      </Provider>
    );
  });
  test('it renders login dialog box', () => {
    expect(
      screen.getByRole('dialog', { name: /Log in to your account/i })
    ).toBeInTheDocument();
  });
  test('it renders logo', () => {
    expect(screen.getByRole('img', { name: /logo/i })).toBeInTheDocument();
  });
  test('it renders github sign-in button', () => {
    expect(screen.getByTestId('GitHubIcon')).toBeInTheDocument();
  });
});
