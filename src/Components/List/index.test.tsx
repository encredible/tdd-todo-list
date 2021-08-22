import React from 'react';
import { fireEvent, render, screen, within } from '@testing-library/react';
import 'jest-styled-components';

import { List } from './index';
import { createMemoryHistory } from 'history';
import { Router, useLocation } from 'react-router-dom';
import { Container } from 'react-dom';

describe('<List >', () => {
  let container: Container;
  beforeEach(() => {
    const history = createMemoryHistory();
    history.push('/');
    localStorage.setItem('ToDoList', '["ToDo 1", "ToDo 2", "ToDo 3"]');

    const TestComponent = (): JSX.Element => {
      const location = useLocation();
      let { pathname } = location
      if (!pathname) {
        // 이유는 모르겠지만 action: PUSH일 때는 location 안에 location이 생기는 문제가 있음.
        // @ts-ignore
        pathname = location.location.pathname
      }

      return <div>{ pathname }</div>;
    }
    container = render(
      <Router history={history}>
        <TestComponent />
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
    const url = screen.getByText('/');
    expect(url).toBeInTheDocument();

    const toDoItem1 = screen.getByText('ToDo 2');
    expect(toDoItem1.getAttribute('href')).toBe('/detail/1');

    fireEvent.click(toDoItem1);
    expect(url.textContent).toBe('/detail/1');
  })

  it('moves to add page', () => {
    const url = screen.getByText('/');
    expect(url).toBeInTheDocument();

    const addButton = screen.getByText('+');
    expect(addButton.getAttribute('href')).toBe('/add');

    fireEvent.click(addButton);
    expect(url.textContent).toBe('/add');
  })
})