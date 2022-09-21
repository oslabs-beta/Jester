import React from 'React';
import userEvent from '@testing-library/user-event';
import { fireEvent, render, screen } from '@testing-library/react';
import {Header} from '../client/components/Header'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'



describe('Unit testing React components', () => {
  const initialState = {testForm: {requestType: 'Get', assertionList: []}};
  const mockStore = configureStore()
  let store
  beforeEach(() => {
    store = mockStore(initialState);
    render(<Provider store={store}><Header/></Provider>)
  })
  test('Header component renders successfully', () => {
    store = mockStore(initialState);
    render(<Provider store={store}><Header/></Provider>)
  })
  xtest('Dropdown menu for request type renders successfully', async () => {
    // const dropdown = screen.getByDisplayValue('Get');
    // console.log(dropdown)
    // expect(dropdown.type).toEqual('text');
    // const dropdown = document.querySelector('#request-selector')

    userEvent.click(screen.getByRole('button', {name: 'Get'}));
    await (() => UserEvent.click(screen.getByText(/Post/i)));
    expect(await screen.getByText('Post')).toBeInTheDocument();

    
  })
  test('Add assertion button renders successfully', () => {
    expect(screen.getByText('+')).toBeInTheDocument();
    const addAssertionButton = screen.getByText('+');
    expect(addAssertionButton.type).toEqual('button');
  })
  test('Endpoint textbox renders successfully', () => {
    const textbox = screen.getByLabelText('Endpoint');
    expect(textbox).toBeInTheDocument();
    expect(textbox.type).toEqual('text');
    expect(textbox.id).toEqual('Get');
  })
  xtest('Add button renders middle component', () => {
    fireEvent.click(screen.getByText('+'));
    const dropdown = screen.getByLabelText('Test Option')
    expect(dropdown).toBeInTheDocument();
    const textbox = screen.getByLabelText('User Input')
    expect(textbox).toBeInTheDocument();
    expect(textbox.type).toEqual('text');
    const button = screen.getByText('-')
    expect(button).toBeInTheDocument();
    expect(button.type).toEqual('Button');
  })

 // add button renders middle component

});
