import React, { Component } from 'react'
import { Tabs, H3 , Tab } from '@blueprintjs/core'
import { Link } from 'react-router-dom'


class SideMenu extends Component {
  render() {
    return (
      <div className="App-Side-Menu">
        <H3>Categories</H3>
        <Tabs vertical="true" large selectedTabId={this.props.selectedCategory}>
          {this.props.content ? this.props.content.map(item => <Tab key={item.id} id={item.id} title={<Link to={`/${item.id}`}>{item.name}</Link>} />): ''}
          <Tabs.Expander />
        </Tabs>
      </div>
    )
  }
}
  

export { SideMenu }
