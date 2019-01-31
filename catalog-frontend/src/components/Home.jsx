import React, { Component } from 'react';
import { Content, SideMenu, Footer, ItemDetails, AppToaster } from './'
import axios from 'axios'
import { Route, Switch, Link } from 'react-router-dom'
import { Breadcrumbs, Breadcrumb, Button } from '@blueprintjs/core'

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      content: []
    }
  }


  componentDidMount() {
    axios.get(`http://${process.env.REACT_APP_BACK_END_IP}/catalog`)
      .then((response => {
        this.setState({
          content: response.data
        })
      }))
      .catch(error => {
        if (error.response)
          AppToaster.show({
            message: error.response.data,
            intent: 'danger',
            icon: 'error'
          })
      })
  }

  renderCurrentBreadcrumb = ({ text, ...restProps }) => {
    return <Breadcrumb {...restProps}>{text}</Breadcrumb>;
  }

  renderBreadcrumb() {
    let initalValue = [{ intent: 'error', text: <Link to="/"><h3>Home</h3></Link> }]
    let path = ''
    let params = Object.entries(this.props.match.params)
    let breadcrumbs = params.reduce((accumulator, currentValue) => {
      if (currentValue[1]) {
        accumulator.push({
          text: <Link to={`${path}/${currentValue[1]}`}><h3>{currentValue[0].replace(/^\w/, c => c.toUpperCase())}</h3></Link>,
          icon: 'chevron-right'
        })
        path = `${path}/${currentValue[1]}`
      }
      return accumulator
    }, initalValue)
    return breadcrumbs
  }

  render() {
    const { category, item } = this.props.match.params
    return (
      <div className="App">
        <SideMenu className="App-Side-Menu"
          content={this.state.content}
          selectedCategory={category}
          onSelectedCategoryChange={this.handleCategoryChange} />
        <div className="App-Content">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '2%' }}>
            <Breadcrumbs
              currentBreadcrumbRenderer={this.renderCurrentBreadcrumb}
              items={this.renderBreadcrumb()} />
              <Link to={`/${category}/create`}><Button disabled={!category} icon="add" intent="primary">Create Item</Button></Link>
          </div>

          <Switch>
            <Route path="/:category/create" render={() => {
              return <ItemDetails selectedCategoryName={ this.state.content[category] ? this.state.content[category].name : '' } selectedCategory={category}
                editingMode={false} token={this.props.token} />
            }} />
             <Route path="/:category/:item" render={() => {
              return <ItemDetails selectedCategory={category}
                selectedItem={item} editingMode={true} token={this.props.token} />
            }} />
            <Route path={"/:category"} render={({ match }) => {
              return <Content selectedCategory={category}
                match={match} className="App-Main-Container" />
            }} />
            <Route path={"/"} render={({ match }) => {
              return <Content match={match} className="App-Main-Container" />
            }} />
          </Switch>
          <Footer />
        </div>
      </div>
    );
  }
}

export { Home };
