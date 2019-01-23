import React, { Component } from 'react'
import { Navbar, Button, Alignment } from '@blueprintjs/core';
import { Link } from 'react-router-dom'

class NavigationBar extends Component {
  render() {
    return (
      <div>
        <Navbar fixedToTop>
          <Navbar.Group align={Alignment.LEFT}>
            <Navbar.Heading>Catalog</Navbar.Heading>
            <Navbar.Divider />
            <Link to="/">
              <Button className="bp3-minimal" icon="home" text="Home" />
            </Link>
          </Navbar.Group>

          <Navbar.Group align={Alignment.RIGHT}>
            {
              this.props.isLoggedIn ?
                <Link to="/logout">
                  <Button className="bp3-minimal" icon="log-out" text="Logout" />
                </Link>
                :
                <div>
                  <Link to="/login">
                  <Button className="bp3-minimal" icon="log-in" text="Login" />
                </Link>
                <Link to="/register">
                  <Button className="bp3-minimal" icon="new-person" text="Register" />
                </Link>
                </div>
            }
          </Navbar.Group>
        </Navbar>
      </div>
    )
  }
}

export { NavigationBar };
