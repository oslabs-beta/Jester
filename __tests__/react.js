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
  test('Dropdown menu for request type renders successfully', async () => {
    // const dropdown = screen.getByDisplayValue('Get');
    // console.log(dropdown)
    // expect(dropdown.type).toEqual('text');
    // const dropdown = document.querySelector('#request-selector')

    userEvent.click(screen.getByRole('button', {name: 'Get'}));
  await (() => UserEvent.click(screen.getByText(/Post/i)));
    expect(await screen.getByText('Post')).toBeInTheDocument();

  //   console.log(screen.getByLabel('Request Type'))

  // fireEvent.change(screen.getByLabelText('Request Type'), { target: { value: 'Post' } })
  // let options = screen.getAllByTestId('request-selector')
  // expect(options[1].selected).toBeTruthy();

    // expect(screen.getByText('Get')).toBeInTheDocument();
    // userEvent.click(screen.getByTestId('request-selector'));
    // userEvent.click(await screen.getByTestId('Post'));


    //userEvent



    // expect(getByTestId('Post').selected).toBe(true);


    // console.log(screen.getByText('Get').nextSibling)

    // console.log(document.querySelector('#request-selector'))

    
  })
  test('Add assertion button renders successfully', () => {
    expect(screen.getByText('+')).toBeInTheDocument();
    const addAssertionButton = screen.getByText('+');
    expect(addAssertionButton.type).toEqual('button');
  })

  // dropdown menu renders
  // add button renders

});
