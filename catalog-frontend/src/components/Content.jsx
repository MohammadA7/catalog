import React, { Component } from 'react'
import { Menu } from './common'
import axios from 'axios'
import { AppToaster } from './'

class Content extends Component {
  constructor(props) {
    super(props)
    this.state = {
      content: [],
      isMounted: false
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.selectedCategory !== this.props.selectedCategory) {
      this.getContet(this.props.selectedCategory)
        .then((response => {
          if (this.state.isMounted) {
            this.setState({
              content: response.data,
            })
          }
        }
        ))
        .catch(error => {
          if (error.response)
          AppToaster.show({
            message: error.response.data,
            intent: 'danger',
            icon: 'error'
          })
        })
    }
  }

  componentDidMount() {
    this.setState({ isMounted: true })
    this.getContet(this.props.selectedCategory)
      .then((response => {
        if (this.state.isMounted) {
          this.setState({
            content: response.data,
          })
        }
      }
      ))
      .catch(error => {
        if (error.response)
          AppToaster.show({
            message: error.response.data,
            intent: 'danger',
            icon: 'error'
          })
      })
  }

  componentWillMount() {
    this.setState({ isMounted: false })
  }

  getContet(selectedCategory) {
    let URL;
    if (selectedCategory)
      URL = `http://${process.env.REACT_APP_BACK_END_IP}/catalog/${selectedCategory}/items/`
    else
      URL = `http://${process.env.REACT_APP_BACK_END_IP}/catalog/items/`

    return axios.get(URL)
  }

  render() {
    return (
      <div>
        <Menu content={this.state.content} />
      </div>
    )
  }
}

export { Content };
