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
    axios.get(process.env.REACT_APP_BACK_END_IP)
    .then((response => {
      console.log(response)
      // this.setState({content: response})
    }))
    .catch(error => console.log(error))
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
