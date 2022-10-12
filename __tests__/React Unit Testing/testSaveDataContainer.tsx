import '@testing-library/jest-dom';
import React from 'React';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { render, screen } from '@testing-library/react';
import { DEFAULT_PROJECT } from '../../client/constants';

import SaveDataContainer from '../../client/containers/SaveDataContainer';

const initialState = {
  userInfo: {
    showSave: true,
    currentProject: DEFAULT_PROJECT,
    newProject: '',
    projectsInfo: [
      {
        project_id: 0,
        project_name: DEFAULT_PROJECT,
        user_id: 0,
        showAccessClipboard: false,
      },
    ],
  },
};

const mockStore = configureStore();

const container = () => {
  render(
    <Provider store={mockStore(initialState)}>
      <SaveDataContainer open={true} />
    </Provider>
  );
};

describe('Unit testing output Save Clipboard Data Container components', () => {
  test('Save Clipboard Data Container renders successfully', () => {
    container();
  });

  beforeEach(() => {
    container();
  });

  test('Renders a title', () => {
    const title = screen.getByText(
      'Would you like to save your current clipboard?'
    );
    expect(title).toBeInTheDocument();
  });

  test('Renders three buttons', () => {
    const bttns = screen.getAllByRole('button');
    expect(bttns).toHaveLength(3);
  });

  test('Renders a dropdown menu for project', () => {
    const dropdown = screen.getByRole('button', { name: 'Guest Project' });
    expect(dropdown).toBeInTheDocument();
  });

  test('Renders a new project input text box', () => {
    expect(screen.getByTestId('new-project')).toBeInTheDocument();
    expect(
      screen.getByRole('textbox', { name: 'New Project Name' })
    ).toBeInTheDocument();
  });

  test('Renders a discard button', () => {
    const bttn = screen.getByRole('button', { name: 'Discard' });
    expect(bttn).toBeInTheDocument();
  });

  test('Renders a save button', () => {
    const bttn = screen.getByRole('button', { name: 'Save' });
    expect(bttn).toBeInTheDocument();
  });
});
