import React, { Component } from 'react'
import { Tabs, H3 , Tab } from '@blueprintjs/core'

class SideMenu extends Component {
  constructor(props) {
    super(props)
    this.handleTabChange = this.handleTabChange.bind(this)
  }

  handleTabChange(id) {
    this.props.onSelectedCatagoryChange(id)
  }

  render() {
    return (
      <div className="App-Side-Menu">
        <H3>Catagories</H3>
        <Tabs vertical="true" large onChange={this.handleTabChange} selectedTabId={this.props.selectedCatagory}>
          {this.props.content.map(item => <Tab key={item.id} id={item.id} title={item.name} />)}
          <Tabs.Expander />
        </Tabs>
      </div>
    )
  }
}
  

export { SideMenu }
