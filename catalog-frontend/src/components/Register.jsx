import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

class Register extends Component {
  render() {
    if (this.props.isLoggedIn)
      return <Redirect to='/' />
    else
      return (
        <div>
          Register
        </div>
      )
  }
}

export { Register }
