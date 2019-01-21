import React, { Component } from 'react';
import './App.scss';
import { Route, Switch } from "react-router-dom";
import { Home, Register, Login } from './components';

class App extends Component {
 render() {
    return (
      <Switch>
        <Route path={"/:catagory?/:item?"} render={({ match }) => {
        return <Home match={match} className="App-Main-Container" />
      }} />
      <Route exact path={"/login"} component={Login}/>
      <Route exact path={"/register"} component={Register}/>
      </Switch>
    );
  }
}

export default App;
