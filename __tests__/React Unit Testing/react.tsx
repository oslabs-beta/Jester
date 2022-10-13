import '@testing-library/jest-dom';

import React from 'React';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { ProjectDropdown } from '../../client/components/ProjectDropdown';
import { RequestBody } from '../../client/components/RequestBody';
import { TestInputForm } from '../../client/components/TestInputForm';
import { DEFAULT_PROJECT } from '../../client/constants';

describe('Unit testing "TestInputForm" component', () => {
  const initialState = {
    testForm: {
      requestType: 'Get',
      assertionList: {},
      i: 0,
      userInput: '',
    },
    userInfo: {
      projectsInfo: [
        {
          project_id: 0,
          project_name: DEFAULT_PROJECT,
          user_id: 0,
          showAccessClipboard: false,
        },
      ],
      currentProject: DEFAULT_PROJECT,
    },
  };

  const mockStore = configureStore();
  let store: any;

  beforeEach(() => {
    store = mockStore(initialState);
    render(
      <Provider store={store}>
        <TestInputForm />
      </Provider>
    );
  });

  test('TestInputForm component renders successfully', () => {
    store = mockStore(initialState);
    render(
      <Provider store={store}>
        <TestInputForm />
      </Provider>
    );
  });

  test('Add assertion button renders successfully', () => {
    expect(screen.getByText('+')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '+' })).toBeInTheDocument();
  });

  test('Endpoint textbox renders successfully', () => {
    expect(
      screen.getByRole('textbox', { name: 'Endpoint' })
    ).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: 'Endpoint' }).id).toEqual(
      'endpoint'
    );
  });

  test('Dropdown menu for project renders successfully', async () => {
    render(
      <Provider store={store}>
        <ProjectDropdown />
      </Provider>
    );
    const dropdown = screen.getByRole('button', { name: 'Guest Project' });
    expect(dropdown).toBeInTheDocument();
  });
});

describe('Unit testing "RequestBody" component', () => {
  const initialState = {
    testForm: {
      requestType: 'Post',
      assertionList: {},
      i: 0,
      userInput: '',
    },
  };

  const mockStore = configureStore();
  let store;

  beforeEach(() => {
    store = mockStore(initialState);
    const state = store.getState();
    render(
      <Provider store={store}>
        <RequestBody
          showField={state.testForm.requestType === 'Get' ? false : true}
        />
      </Provider>
    );
  });

  test('Request body textbox renders successfully when requestType is Post, Patch, or Delete', () => {
    expect(screen.getByTestId('Request-Body')).toBeInTheDocument();
  });
});
