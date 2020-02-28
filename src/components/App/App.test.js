import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import ReactDOM from 'react-dom'

it('renders the app component', () => {
  const div = document.createElement('div')

  ReactDOM.render(<App />, div)
  ReactDOM.unmountComponentAtNode(div)
});
