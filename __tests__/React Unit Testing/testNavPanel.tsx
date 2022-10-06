import React from 'React';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { NavPanelContainer } from '../../client/containers/NavPanelContainer';
import { BrowserRouter } from 'react-router-dom';
import { ProjectPanelContainer } from '../../client/containers/ProjectPanelContainer';
import { AccessClipboardDisplay } from '../../client/components/AccessClipboardDisplay';
import Cookies from 'js-cookie';

const initialState = {
  navPanel: {
    showProjectPanel: false,
    showAddProject: false,
  },
  userInfo: {
    projectsInfo: [],
  },
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
});


const initialStore= {
  navPanel: {
    showProjectPanel: true,
    showAddProject: false,
  },
  userInfo: {
    projectsInfo: [{project_id: 1, project_name: 'Project One'}],
  },
};
const projectPanelContainer = () => {
  render(
    <Provider store={mockStore(initialStore)}>
      <BrowserRouter>
        <ProjectPanelContainer />
      </BrowserRouter>
    </Provider>
  );
};

describe('Unit testing ProjectPanelContainer', () => {
  beforeEach(() => {
    projectPanelContainer();
  });
  test('it should render add new project button', () => {
    expect(screen.getByRole('button', {name: 'Add New Project'})).toBeInTheDocument();
  });
  test('it should render a button for each project', () => {
    expect(screen.getByRole('button', {name: 'Project One'})).toBeInTheDocument();
  });

});

const defaultStore= {
  navPanel: {
    showProjectPanel: true,
    showAddProject: false,
  },
  userInfo: {
    projectsInfo: [{project_id: 1, project_name: 'Project One', showAccessClipboard: true,}],
  },
};
const accessClipboardDisplay = () => {
  render(
    <Provider store={mockStore(defaultStore)}>
      <BrowserRouter>
        <AccessClipboardDisplay projectId={1}/>
      </BrowserRouter>
    </Provider>
  );
};

describe('Unit testing AccessClipboardDisplay', () => {
  beforeEach(() => {
    accessClipboardDisplay();
  });
  test('it should render clipboard button', () => {
    expect(screen.getByRole('button', {name: 'Clipboard'})).toBeInTheDocument();
  });
  test('it should render clear clipboard button', () => {
    expect(screen.getByRole('button', {name: 'Clear Clipboard'})).toBeInTheDocument();
  });
  test('it should render delete project button when user logged in', () => {
    sessionStorage.setItem('isLoggedIn', 'true');
    accessClipboardDisplay();
    expect(screen.getByRole('button', {name: 'Delete Project'})).toBeInTheDocument();
    Cookies.remove('isLoggedIn');
    sessionStorage.clear();
  });
});