import React from 'react';
import { Router, Route } from 'react-router-dom';
import { createMemoryHistory, MemoryHistory } from 'history';
import { cleanup, fireEvent, render, RenderResult, screen } from '@testing-library/react';
import 'jest-styled-components';
import { Detail } from './index';
import { Container } from 'react-dom';

describe('<Detail />' , () => {
  let history: MemoryHistory;
  let container: Container;
  beforeEach(() => {
    localStorage.setItem('ToDoList', '["ToDo 1","ToDo 2"]');
    history = createMemoryHistory();
    history.push('/detail/1');
    container = render(
      <Router history={history}>
        <Route path="/detail/:id">
          <Detail />
        </Route>
      </Router>
    ).container;
  });

  it('renders component correctly', () => {
    const toDoItem = screen.getByText('ToDo 2');
    expect(toDoItem).toBeInTheDocument();

    const button = screen.getByText('삭제')
    expect(button).toBeInTheDocument();

    expect(container).toMatchSnapshot();
  });

  it('redirect to Not Found page if todo id is wrong', () => {
    cleanup()
    localStorage.clear();
    render(
      <Router history={history}>
        <Route path="/detail/:id">
          <Detail />
        </Route>
      </Router>
    )
    expect(history.location.pathname).toBe('/404');
  });

  it('delete a ToDo and redirect to the List page', () => {
    expect(history.location.pathname).toBe('/detail/1');

    const button = screen.getByText('삭제');
    fireEvent.click(button);
    expect(JSON.parse(localStorage.getItem('ToDoList') as string)).not.toContain('ToDo 2');
    expect(history.location.pathname).toBe('/');
  })
})