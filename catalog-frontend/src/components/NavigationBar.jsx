import React, { Component } from 'react'
import { Navbar, Button, Alignment } from '@blueprintjs/core';

class NavigationBar extends Component {
  render() {
    return (
      <div>
        <Navbar fixedToTop>
          <Navbar.Group align={Alignment.LEFT}>
            <Navbar.Heading>Catalog</Navbar.Heading>
            <Navbar.Divider />
            <Button className="bp3-minimal" icon="home" text="Home" />
            <Button className="bp3-minimal" icon="document" text="Files" />
          </Navbar.Group>
        </Navbar>
      </div>
    )
  }
}

export { NavigationBar };
