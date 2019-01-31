import React, { Component } from 'react'
import './App.scss';
import { Route, Switch } from "react-router-dom"
import { Home, Register, Login, NavigationBar, AppToaster } from './components'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoggedIn: false,
      token: '',
    }
    this.onLoginSuccess = this.onLoginSuccess.bind(this)
    this.onLogout = this.onLogout.bind(this)
  }

  onLoginSuccess(token) {
    this.setState({
      isLoggedIn: true,
      token,
    })
  }

  onLogout() {
    if (this.state.isLoggedIn) {
      this.setState({
        isLoggedIn: false,
        token: ''
      })
      AppToaster.show({
        message: "Goodbye, old friend.",
        intent: 'warning',
        icon: 'hand'
      })
    }
  }

  render() {
    const { isLoggedIn, token } = this.state
    return (
      <div>
        <NavigationBar isLoggedIn={isLoggedIn} onLogout={this.onLogout}/>
        <Switch>
          <Route exact path={"/login"} render={() => <Login
            isLoggedIn={isLoggedIn}
            onLoginSuccess={this.onLoginSuccess} />} />
          <Route exact path={"/register"} render={() => <Register
            isLoggedIn={isLoggedIn} />} />
          <Route path={"/:category?/:item?"} render={({ match }) => {
            return <Home token={token} isLoggedIn={isLoggedIn} match={match} className="App-Main-Container" />
          }} />
        </Switch>
      </div>
    )
  }
}

export default App;
