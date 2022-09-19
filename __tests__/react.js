import React from 'React';
import { Provider } from 'react-redux';
import userEvent from '@testing-library/user-event';
import { fireEvent, render, screen } from '@testing-library/react';
import { Header } from '../client/components/Header.jsx';

describe('Unit testing React components', () => {
  describe('Header', () => {
    beforeEach(() => {
      renderedText = render(<Header />);
    });
    test('it runs without crashing', () => {
      render(<Header />);
    });
    xtest('Renders dropdown menu', () => {
      const dropdown = document.getElementById('request-selector');
      const display = dropdown.children[0];
      expect(display.textContent).toBe('Get');
      console.log(display.textContent);
      fireEvent.click(dropdown);
      const dropdownOptions = getAllByRole(dropdown, 'option');
      fireEvent.click(dropdownOptions[2]);
      expect(display.textContent).toBe('Post');
      console.log(display.textContent);
    });
    xtest('Renders add button', () => {
      const button = document.getElementById('add-assertion');
      expect(button).toBeTruthy();
      fireEvent.click(button);
      expect('----onclick mock function goes here').toHaveBeenCalled();
    });
  });
});
