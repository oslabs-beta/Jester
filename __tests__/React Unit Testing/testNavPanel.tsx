import '@testing-library/jest-dom';

import Cookies from 'js-cookie';
import React from 'React';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';

import { fireEvent, render, screen } from '@testing-library/react';

import { AddProjectDialog } from '../../client/components/AddProjectDialog';
import { NavPanelContainer } from '../../client/containers/NavPanelContainer';

const initialState = {
  navPanel: {
    showProjectPanel: true,
    showAddProject: false,
  },
  userInfo: {
    projectsInfo: [
      { project_id: 1, project_name: 'Guest Project', showAccessClipboard: true },
    ],
  },
  clipboard: {
    codeSnippets: [],
  }
};
const mockStore: any = configureStore();
const navPanel = () => {
  render(
    <Provider store={mockStore(initialState)}>
      <BrowserRouter>
        <NavPanelContainer />
      </BrowserRouter>
    </Provider>
  );
};

describe('Unit testing navPanel', () => {
  beforeEach(() => {
    navPanel();
  });
  test('it should render navPanelDisplay home button and projects button', () => {
    expect(screen.getByRole('button', { name: 'Home' })).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Projects' })
    ).toBeInTheDocument();
  });

  describe('Unit testing ProjectPanelContainer when Projects button clicked', () => {
    let button;
    beforeEach(() => {
      button = screen.getByRole('button', { name: 'Projects' });
      fireEvent.click(button);
    });
    test('it should render add new project button', () => {
      expect(
        screen.getByRole('button', { name: 'Add New Project' })
      ).toBeInTheDocument();
    });
    test('it should render a button for each project', () => {
      expect(
        screen.getByRole('button', { name: 'Guest Project' })
      ).toBeInTheDocument();
    });

    describe('Unit testing AccessClipboardDisplay when a project is clicked', () => {
      let button;
      beforeEach(() => {
        button = screen.getByRole('button', { name: 'Guest Project' });
        fireEvent.click(button);
      });
      test('it should render clipboard button', () => {
        const button = screen.getByRole('button', { name: 'Guest Project' });
        fireEvent.click(button);
        expect(
          screen.getByRole('button', { name: 'Clipboard' })
        ).toBeInTheDocument();
      });
      test('it should render clear clipboard button', () => {
        expect(
          screen.getByRole('button', { name: 'Clear Clipboard' })
        ).toBeInTheDocument();
      });
      test('it should render delete project button when user logged in', () => {
        sessionStorage.setItem('isLoggedIn', 'true');
        navPanel();
        expect(
          screen.getByRole('button', { name: 'Delete Project' })
        ).toBeInTheDocument();
        Cookies.remove('isLoggedIn');
        sessionStorage.clear();
      });
    });
  });
});

const defaultStore = {
  navPanel: {
    showAddProject: true,
  },
  userInfo: {
    showLogin: false,
  },
  clipboard: {
    codeSnippets: [],
  }
};

const addProjectDialog = () => {
  render(
    <Provider store={mockStore(defaultStore)}>
      <BrowserRouter>
        <AddProjectDialog />
      </BrowserRouter>
    </Provider>
  );
};

describe('Unit testing AddProjectDialog when add new project is clicked', () => {
  beforeEach(() => {
    addProjectDialog();
  });
  test('it should render a dialog box with instructions if a user is not logged in', () => {
    expect(screen.getByRole('dialog', { name: 'To add a project, you must be logged in!' })).toBeInTheDocument();
    expect(
      screen.getByText('To add a project, you must be logged in!')
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument();
  });
  test('it should render a dialog box for user to add project if they are logged in', () => {
    sessionStorage.setItem('isLoggedIn', 'true');
    addProjectDialog();
    expect(
      screen.getByRole('textbox', { name: 'Project Name:' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Create Project' })
    ).toBeInTheDocument();
    Cookies.remove('isLoggedIn');
    sessionStorage.clear();
  });
});
