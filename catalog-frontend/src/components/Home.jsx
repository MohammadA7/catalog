import React, { Component } from 'react';
import { Content, SideMenu, Footer, ItemDetails } from './'
import axios from 'axios'
import { Route, Switch } from 'react-router-dom'
import { Breadcrumbs, Card, Breadcrumb, Elevation } from '@blueprintjs/core'

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      content: []
    }
  }


  componentDidMount() {
    axios.get(`http://${process.env.REACT_APP_BACK_END_IP}/`)
      .then((response => {
        this.setState({
          content: response.data
        })
      }))
      .catch(error => console.log(error))
  }
  renderCurrentBreadcrumb = ({ text, ...restProps }) => {
    return <Breadcrumb className="bold capitalize" {...restProps}>{text}</Breadcrumb>;
  }
  renderBreadcrumb() {
    let initalValue = [{ href: "/", text: "Home" }]
    let path = ""
    let params = Object.entries(this.props.match.params)
    let breadcrumbs = params.reduce((accumulator, currentValue) => {
      if (currentValue[1]) {
        accumulator.push({
          href: `${path}/${currentValue[1]}`,
          text: currentValue[0].replace(/^\w/, c => c.toUpperCase()),
          icon: 'chevron-right'
        })
        path = `${path}/${currentValue[1]}`
      }
      return accumulator
    }, initalValue)
    return breadcrumbs
  }


  render() {
    return (
      <div className="App">
        <SideMenu className="App-Side-Menu"
          content={this.state.content}
          selectedCatagory={this.props.match.params.catagory}
          onSelectedCatagoryChange={this.handleCatagoryChange} />
        <div className="App-Content">
          <Card style={{ alignSelf: 'flex-start', margin: .20 }} elevation={Elevation.ZERO}>
            <Breadcrumbs
              currentBreadcrumbRenderer={this.renderCurrentBreadcrumb}
              items={this.renderBreadcrumb()} />
          </Card>
          <Switch>
            <Route path="/:catagory/:item" component={ItemDetails} />
            <Route path={"/:catagory"} render={({ match }) => {
              return <Content selectedCatagory={this.props.match.params.catagory}
                match={match} className="App-Main-Container" />
            }} />
            <Route path={"/"} render={({ match }) => {
              return <Content match={match} className="App-Main-Container" />
            }} />
          </Switch>
          <Footer className="App-Footer" />
        </div>
      </div>
    );
  }
}

export { Home };
