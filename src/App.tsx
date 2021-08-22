import React from 'react';
import Styled from 'styled-components';
import { Button, List, PageHeader } from 'Components';

const Container = Styled.div`
  min-height: 100vh;
  background-color: #EEEEEE;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

function App() {
  return (
    <Container>
      <PageHeader />
    </Container>
  );
}

export default App;
