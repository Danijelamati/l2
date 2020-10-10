import React from 'react';
import { Route, BrowserRouter as Router, Switch, Redirect} from 'react-router-dom';

import { appStore, AppContext } from './Store/appStore'; 

import Edit from './Pages/Edit';
import List from './Pages/List';

import './App.css';

function ToList (){
  return <Redirect to="/list" />;
}

function App() { 
  
  return (    
    <Router>
      <Switch>
        <AppContext.Provider value={appStore()}>
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
            path="/"
            component={ToList}
          />          
        </AppContext.Provider>        
      </Switch>
    </Router>           
  );
}

export default App;
