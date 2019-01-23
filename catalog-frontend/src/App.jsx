import React, { Component } from 'react';
import './App.scss';
import { Route, Switch } from "react-router-dom";
import { Home, Register, Login, NavigationBar } from './components';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoggedIn: false
    }
  }
  render() {
    return (
      <div>
        <NavigationBar isLoggedIn={this.state.isLoggedIn} />
        <Switch>
          <Route exact path={"/login"} isLoggedIn={this.state.isLoggedIn} component={Login} />
          <Route exact path={"/register"} isLoggedIn={this.state.isLoggedIn} component={Register} />
          <Route path={"/:catagory?/:item?"} render={({ match }) => {
            return <Home isLoggedIn={this.state.isLoggedIn} match={match} className="App-Main-Container" />
          }} />
        </Switch>
      </div>

    );
  }
}

export default App;
