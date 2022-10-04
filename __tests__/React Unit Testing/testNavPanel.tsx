import React from 'React';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { NavPanelContainer } from '../../client/containers/NavPanelContainer';
import { BrowserRouter } from 'react-router-dom';
import { ProjectPanelContainer } from '../../client/containers/ProjectPanelContainer';

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
