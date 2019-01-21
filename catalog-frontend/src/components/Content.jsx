import React, { Component } from 'react'
import { Menu } from './common'
import axios from 'axios'

class Content extends Component {
  constructor(props) {
    super(props)
    this.state = {
      content: [],
      isMounted: false
    }
    this.handleClick = this.handleClick.bind(this)
  }
  componentDidUpdate(prevProps) {
    if (prevProps.selectedCatagory !== this.props.selectedCatagory) {
      this.getContet(this.props.selectedCatagory)
        .then((response => {
          if (this.state.isMounted) {
            this.setState({
              content: response.data,
            })
          }
        }
        ))
        .catch(error => console.log(error))
    }
  }

  componentDidMount() {
    this.setState({ isMounted: true })
    this.getContet(this.props.selectedCatagory)
      .then((response => {
        if (this.state.isMounted) {
          this.setState({
            content: response.data,
          })
        }
      }
      ))
      .catch(error => console.log(error))
  }

  componentWillMount() {
    this.setState({ isMounted: false })
  }

  getContet(selectedCatagory) {
    let URL;
    if (selectedCatagory)
      URL = `http://${process.env.REACT_APP_BACK_END_IP}/catalog/${selectedCatagory}/items/`
    else
      URL = `http://${process.env.REACT_APP_BACK_END_IP}/catalog/items/`

    return axios.get(URL)
  }

  handleClick(e) {
    console.log("Click!")
  }

  render() {
    return (
      <div>
        <Menu content={this.state.content} handleClick={this.handleClick} />
      </div>
    )
  }
}

export { Content };
