import React, { useState } from 'react';
import Styled from 'styled-components';
import { Button } from 'Components';
import { useHistory } from 'react-router-dom';

const Container = Styled.div`
  display: flex;
`;
const Input = Styled.input`
  fonrt-size: 16px;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #BDBDBD;
  outline: none;
`;

export const Add = () => {
  const [toDo, setToDo] = useState('');
  const { replace } = useHistory()
  const addToDo = (): void => {
    if (toDo === '') return;
    const list = JSON.parse(localStorage.getItem('ToDoList') || '[]');
    localStorage.setItem('ToDoList', JSON.stringify([...list, toDo]));
    replace('/');
  };
  return (
    <Container>
      <Input placeholder="할 일을 입력해 주세요" onChange={(e) => setToDo(e.target.value)} />
      <Button label="추가" onClick={addToDo}/>
    </Container>
  );
}