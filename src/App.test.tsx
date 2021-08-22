import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';

test('renders learn react link', () => {
  const history = createMemoryHistory();
  history.push('/');
  render(
    <Router history={history}>
      <App />
    </Router>
  );
  const linkElement = screen.getByText('할 일 목록');
  expect(linkElement).toBeInTheDocument();
});
