import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import 'jest-styled-components';
import { Router } from 'react-router-dom';
import { createMemoryHistory, MemoryHistory } from 'history';

import { Add } from './index';
import { Container } from 'react-dom';

describe('<Add />', () => {
  let container: Container;
  let history: MemoryHistory;
  beforeEach(() => {
    localStorage.setItem('ToDoList', '["Old ToDo"]');

    history = createMemoryHistory();
    history.push('/add');
    container = render(
      <Router history={history}>
        <Add />
      </Router>
    ).container;
  });

  it('renders component correctly', () => {
    const input = screen.getByPlaceholderText('할 일을 입력해 주세요');
    expect(input).toBeInTheDocument();

    const button = screen.getByText('추가');
    expect(button).toBeInTheDocument();
  });

  it('add a new ToDo and redirect to the root page', () => {
    const input = screen.getByPlaceholderText('할 일을 입력해 주세요');
    const button = screen.getByText('추가');

    expect(history.location.pathname).toBe('/add')

    fireEvent.change(input, { target: { value: 'New ToDo' } });
    fireEvent.click(button);
    expect(localStorage.getItem('ToDoList')).toBe('["Old ToDo","New ToDo"]');
    expect(history.location.pathname).toBe('/')
  });

  it('do nothing if the input is empty', () => {
    const button = screen.getByText('추가');

    fireEvent.click(button);

    expect(localStorage.getItem('ToDoList')).toBe('["Old ToDo"]');
    expect(history.location.pathname).toBe('/add')
  })
})
