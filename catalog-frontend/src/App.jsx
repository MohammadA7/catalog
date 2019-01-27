import React, { Component } from 'react'
import './App.scss';
import { Route, Switch } from "react-router-dom"
import { Home, Register, Login, NavigationBar } from './components'
import axios from 'axios'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoggedIn: false,
      token: '',
    }
    this.onLoginSuccess = this.onLoginSuccess.bind(this)
  }

  onLoginSuccess(token) {
    this.setState({
      isLoggedIn: true,
      token: token
    })
  }
  onLogout() {
    axios.get()
    this.setState({
      isLoggedIn: false,
      token: ''
    })
  }

  render() {
    return (
      <div>
        <NavigationBar isLoggedIn={this.state.isLoggedIn} />
        <Switch>
          <Route exact path={"/login"} render={() => <Login
            isLoggedIn={this.state.isLoggedIn}
            onLoginSuccess={this.onLoginSuccess} />} />
          <Route exact path={"/logout"} render={() => this.onLogout()} />
          <Route exact path={"/register"} render={() => <Register
            isLoggedIn={this.state.isLoggedIn} />} />
          <Route path={"/:catagory?/:item?"} render={({ match }) => {
            return <Home isLoggedIn={this.state.isLoggedIn} match={match} className="App-Main-Container" />
          }} />
        </Switch>
      </div>
    )
  }
}

export default App;
