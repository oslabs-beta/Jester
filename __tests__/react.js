import React from 'React';
import { Provider } from 'react-redux';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import App from '../client/App';


// For the textbox containing the generated code, we test that when state is updated that text box renders the text from state
describe('Unit testing React components', () => {

  describe('LabeledText', () => {
    let text;
    const props = {
      label: 'Mega',
      text: 'Markets',
    };

    beforeAll(() => {
      text = render(<LabeledText {...props} />);

    });

    test('Renders the passed-in text with the label in bold', () => {
      expect(text.getByText('Mega:').nextSibling).toHaveTextContent('Markets');
      expect(text.getByText('Mega:')).toHaveStyle('font-weight: bold');
    });

  });
// 
