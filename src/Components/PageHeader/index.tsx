import React from 'react';
import Styled from 'styled-components';
import { useLocation, Link } from 'react-router-dom';

const Container = Styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #1E40FF;
`;

const Title = Styled.div`
  padding: 20px;
  color: #FFFFFF;
  font-size: 20px;
  font-weight: 600;  
`;

const GoBack = Styled(Link)`
  padding: 20px;
  color: #FFFFFF;
  font-size: 16px;
  font-weight: 600;
  text-decoration: none;
  position: absolute;
  left: 20px;
`;

export const PageHeader = () => {
  const location = useLocation();
  let { pathname } = location
  if (!pathname) {
    // 이유는 모르겠지만 action: PUSH일 때는 location 안에 location이 생기는 문제가 있음.
    // @ts-ignore
    pathname = location.location.pathname
  }
  let title = '에러';
  if (pathname === '/') {
    title = '할 일 목록'
  } else if (pathname === '/add') {
    title = '할 일 추가'
  } else if (pathname.startsWith('/detail')) {
    title = '할 일 상세'
  }
  return (
    <Container>
      <Title>{title}</Title>
      {pathname !== '/' && <GoBack to='/'>돌아가기</GoBack>}
    </Container>
  );
}
