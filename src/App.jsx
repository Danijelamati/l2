import React from 'react';
import {
  Route, BrowserRouter as Router, Switch, Redirect,
} from 'react-router-dom';

import { RootStore, RootContext } from './Store/RootStore';

import { Edit, List, Create } from './Pages';
/*
import Edit from './Pages/Edit';
import List from './Pages/List';
import Create from './Pages/Create';
*/
import './App.css';


function ToList() {
  return <Redirect to="/list" />;
}

function App() {
  return (
    <RootContext.Provider value={new RootStore()}>
      <Router>
        <Switch>        
          <Route
            path="/edit"
            exact
            component={Edit}
          />
          <Route
            path="/list"
            exact
            component={List}
          />
          <Route
            path="/create"
            exact
            component={Create}
          />
          <Route
            path="/"
            component={ToList}
          />        
        </Switch>
      </Router>
    </RootContext.Provider>
  );
}

export default App;
