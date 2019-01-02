import React, { Component } from 'react';
import './App.css';
import { NavigationBar, Content, Footer } from './components'

class App extends Component {
  render() {
    return (
      <div className="App">
        <NavigationBar />
        <Content />
        <Footer />
      </div>
    );
  }
}

export default App;
