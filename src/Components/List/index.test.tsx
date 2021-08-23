import React from 'react';
import { fireEvent, render, screen, within } from '@testing-library/react';
import 'jest-styled-components';

import { List } from './index';
import { createMemoryHistory, MemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { Container } from 'react-dom';

describe('<List >', () => {
  let container: Container;
  let history: MemoryHistory;
  beforeEach(() => {
    history = createMemoryHistory();
    history.push('/');
    localStorage.setItem('ToDoList', '["ToDo 1", "ToDo 2", "ToDo 3"]');

    container = render(
      <Router history={history}>
        <List />
      </Router>
    ).container;
  })
  it('renders component correctly', () => {
    const toDoItem1 = screen.getByText('ToDo 1');
    expect(toDoItem1).toBeInTheDocument();

    const toDoItem2 = screen.getByText('ToDo 2');
    expect(toDoItem2).toBeInTheDocument();

    const toDoItem3 = screen.getByText('ToDo 3');
    expect(toDoItem3).toBeInTheDocument();

    expect(screen.getAllByText('삭제').length).toBe(3);

    const addButton = screen.getByText('+');
    expect(addButton).toBeInTheDocument();

    expect(container).toMatchSnapshot();
  });

  it('deletes toDo item', () => {
    const toDoItem = screen.getByText('ToDo 2');
    expect(toDoItem).toBeInTheDocument()
    fireEvent.click(toDoItem.nextElementSibling as HTMLElement);

    expect(toDoItem).not.toBeInTheDocument();
    expect(JSON.parse(localStorage.getItem('ToDoList') as string)).not.toContain('ToDo 2');
  });

  it('moves to detail page', () => {
    expect(history.location.pathname).toBe('/')

    const toDoItem1 = screen.getByText('ToDo 2');
    expect(toDoItem1.getAttribute('href')).toBe('/detail/1');

    fireEvent.click(toDoItem1);
    expect(history.location.pathname).toBe('/detail/1')
  })

  it('moves to add page', () => {
    expect(history.location.pathname).toBe('/')

    const addButton = screen.getByText('+');
    expect(addButton.getAttribute('href')).toBe('/add');

    fireEvent.click(addButton);
    expect(history.location.pathname).toBe('/add')
  })
})