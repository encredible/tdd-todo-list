import React from 'react';
import Styled from 'styled-components';
import { List, PageHeader, Add, Detail, NotFound } from 'Components';
import { Route, Switch } from 'react-router-dom';

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
      <Switch>
        <Route exact path="/" component={List} />
        <Route path="/add" component={Add} />
        <Route path="/detail/:id" component={Detail} />
        <Route component={NotFound} />
      </Switch>
    </Container>
  );
}

export default App;



