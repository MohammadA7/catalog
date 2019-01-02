import React, { Component } from 'react'
import { SideMenu, MainMenu } from './'

class Content extends Component {
  render() {
    return (
      <div className="App-Content">
        <SideMenu />
        <MainMenu />
      </div>
    )
  }
}

export { Content };
