import React, { Component } from 'react'
import {
  Card, FormGroup, InputGroup,
  H3, Button, Text, H5
} from '@blueprintjs/core'
import axios from "axios";
import { AppToaster } from './toster'
import { Redirect } from 'react-router-dom'

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

  render() {
    if (this.props.isLoggedIn)
      return <Redirect to='/' />
    else
      return (
        <div className="Login-Container">
          <Card style={{ margin: '3%', padding: '1.5%' }}>
            <H3>Login</H3>
            <H5>Login with google account</H5>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ width: '42%', height: '1px', background: '#ccc' }} />
              <Text>OR</Text>
              <div style={{ width: '42%', height: '1px', background: '#ccc' }} />
            </div>
            <H5>Login with regular account</H5>
            <FormGroup
              label="Email"
              labelFor="email"
              labelInfo="(required)"
            >
              <InputGroup id="email" placeholder="example@gmail.com" leftIcon="user" onChange={this.handleUsernameChange} />
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
