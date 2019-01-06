import React, { Component } from 'react'
import { Menu } from './common';
import axios from 'axios';

class MainMenu extends Component {
  constructor(props) {
    super(props)
    this.state = {
      content: []
    }
    this.handleClick = this.handleClick.bind(this)
  }
  componentDidMount() {
    axios.get(

      
    )
  }
  handleClick(e) {
    console.log("Click!")
  }
  render() {
    return (
      <Menu content={this.state.content} handleClick={this.handleClick}/>
    )
  }
}

export { MainMenu }
