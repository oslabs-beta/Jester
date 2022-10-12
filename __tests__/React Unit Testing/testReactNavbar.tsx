import React from 'React';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import Navbar from '../../client/components/Navbar';

import '@testing-library/jest-dom';
import { clipboardStateType } from '../../client/types';

type codeType = {
  codeOutput: string;
};

type userInfoType = {
  showLogin: false;
};

type clipboardType = {
  codeSnippets: string[];
}

type initialStateType = {
  code: codeType,
  userInfo: userInfoType,
  clipboard: clipboardType,
};

const initialState: initialStateType = {
  code: {
    codeOutput: 'describe(\'Sample description\')',
  },
  userInfo: {
    showLogin: false,
  },
  clipboard: {
    codeSnippets: [],
  }
};

const mockStore: any = configureStore();

const navbar = () => {
  render(
    <Provider store={mockStore(initialState)}>
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    </Provider>
  );
};
describe('Unit testing Navbar components', () => {
  beforeEach(() => {
    navbar();
  });

  test('Renders Navbar', () => {
    navbar();
  });

  test('Renders Logo', () => {
    const logo = screen.getByAltText(/logo/i);
    expect(logo).toBeInTheDocument();
  });

  xtest('Renders the link to the tutorial', () => {
    const button = screen.getByRole('button', { name: /documentation/i });
    expect(button).toBeInTheDocument();
  });

  test('Renders the login button', () => {
    const button = screen.getByRole('button', { name: /login/i });
    expect(button).toBeInTheDocument();
  });
});
