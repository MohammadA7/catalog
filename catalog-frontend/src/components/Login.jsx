import React, { Component } from 'react'
import {
  Card, FormGroup, InputGroup,
  H3, Button, Text, H5
} from '@blueprintjs/core'
import axios from "axios";
import { AppToaster } from './'
import { Redirect } from 'react-router-dom'
import GoogleLogin from 'react-google-login';

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: ''
    }
    this.onRegularLoginSubmit = this.onRegularLoginSubmit.bind(this)
    this.handleUsernameChange = this.handleUsernameChange.bind(this)
    this.handlePasswordChange = this.handlePasswordChange.bind(this)
    this.onGoogleSignInSuccess = this.onGoogleSignInSuccess.bind(this)
  }

  onRegularLoginSubmit() {
    axios.get('/token', {
      method: 'get',
      baseURL: `http://${process.env.REACT_APP_BACK_END_IP}/`,
      auth: {
        username: this.state.username,
        password: this.state.password
      }
    })
      .then((response) => {
        this.props.onLoginSuccess(response.data.token)
        AppToaster.show({
          message: 'Logged in successfully',
          intent: 'success',
          icon: 'tick'
        })
      })
      .catch(error => {
        console.log(error)
        if (error.response) {
          AppToaster.show({
            message: error.response.data,
            intent: 'danger',
            icon: 'error'
          })
        }
      })
  }


  handleUsernameChange(e) {
    this.setState({
      username: e.target.value
    })
  }

  handlePasswordChange(e) {
    this.setState({
      password: e.target.value
    })
  }

  onGoogleSignInSuccess(response) {
    const auth_code = response.code
    axios.post(`http://${process.env.REACT_APP_BACK_END_IP}/gconnect`, {
      auth_code,
      redirect_uri: 'postmessage',
      'Content-Type': 'application/octet-stream; charset=utf-8'
    }).then((response) => {
      this.props.onLoginSuccess(response.data.token)
      AppToaster.show({
        message: 'Logged in successfully',
        intent: 'success',
        icon: 'tick'
      })
    })
      .catch(error => {
        console.log(error)
        if (error.response) {
          AppToaster.show({
            message: error.response,
            intent: 'danger',
            icon: 'error'
          })
        }
      })
  }
  onGoogleSignInFailure(response) {
    console.log(response)
    if (response) {
      AppToaster.show({
        message: response.data,
        intent: 'danger',
        icon: 'error'
      })
    }
  }

  render() {
    if (this.props.isLoggedIn)
      return <Redirect to='/' />
    else
      return (
        <div className="Login-Container">
          <Card style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', margin: '3%', padding: '1.5%' }}>
            <H3>Login</H3>
            <H5>Login with google account</H5>
            <GoogleLogin
              style={{ margin: '%2' }}
              theme="dark"
              responseType="code"
              accessType="offline"
              onSuccess={this.onGoogleSignInSuccess}
              onFailure={this.onGoogleSignInFailure}
              clientId="300970279150-og2ou2hij38hb4lvqk0v0akngm5uj206.apps.googleusercontent.com" />

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ width: '42%', height: '1px', background: '#ccc' }} />
              <Text>OR</Text>
              <div style={{ width: '42%', height: '1px', background: '#ccc' }} />
            </div>
            <H5>Login with regular account</H5>
            <FormGroup
              label="Username"
              labelFor="username"
              labelInfo="(required)"
            >
              <InputGroup id="username" placeholder="Username" leftIcon="user" onChange={this.handleUsernameChange} />
            </FormGroup>
            <FormGroup
              label="Password"
              labelFor="password"
              labelInfo="(required)"
            >
              <InputGroup id="password" placeholder="Password" type="password" leftIcon="lock" onChange={this.handlePasswordChange} />
            </FormGroup>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button text="Cancel" style={{ margin: '1%' }} />
              <Button text="Login" onClick={this.onRegularLoginSubmit} intent="primary" style={{ margin: '1%' }} />
            </div>
          </Card>
        </div>
      )
  }
}
export { Login }
