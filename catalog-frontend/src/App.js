import React, { Component } from 'react';
import './App.scss';
import { NavigationBar, Content, SideMenu, Footer } from './components'
import axios from 'axios'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      content: [],
      selectedCatagory: ''
    }
    this.handleCatagoryChange = this.handleCatagoryChange.bind(this)
  }
  
  componentDidMount() {
    axios.get(`http://${process.env.REACT_APP_BACK_END_IP}/`)
      .then((response => {
        this.setState({
          content: response.data,
        })
      }))
      .catch(error => console.log(error))
  }

  handleCatagoryChange(id) {
    this.setState({ selectedCatagory: id })
  }

  render() {
    return (
      <div className="App">
        <NavigationBar className="navbar" />
        <SideMenu className="App-Side-Menu"
          content={this.state.content}
          selectedCatagory={this.state.selectedCatagory}
          onSelectedCatagoryChange={this.handleCatagoryChange} />
        <div className="App-Content">
          <Content className="App-Main-Container" 
            selectedCatagory={this.state.selectedCatagory} />  
          <Footer className="App-Footer" />
        </div>
      </div>
    );
  }
}

export default App;
