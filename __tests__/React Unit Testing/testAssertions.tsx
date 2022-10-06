// expect first assertion to render status code type
// expect 2nd to render content type type
// expect 3rd to render res body type
// expect user input to be sent to.... ????
// expect delete button to decrement assertion list

// required imports:
// state from userInputSlice
// reducers from userInputSlice
// add button from Header(?)
// 

import React from 'React';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { Assertions } from '../../client/components/Assertions';

import '@testing-library/jest-dom';

type sliceType = {
    userInputType: string
  };
  
  type initialStateType = {
    slice: sliceType,
  }
  
  const initialState: initialStateType = {slice: {
    userInputType: `describe('Sample description')`,
  }};

  const mockStore: any = configureStore()

  const newAssertion = () => {
    render(
      <Provider store={ mockStore(initialState) }>
        <Assertions />
      </Provider>
    );
  };