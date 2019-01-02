import React, { Component } from 'react'
import { Tabs, Tab } from '@blueprintjs/core'

class SideMenu extends Component {
  render() {
    return (
      <div className="App-Side-Menu">
        <Tabs id="TabsExample" vertical="true" onChange={this.handleTabChange} selectedTabId="rx">
          <Tab id="ng" title="Angular" />
          <Tab id="mb" title="Ember" />
          <Tab id="rx" title="React" />
          <Tab id="bb" disabled title="Backbone" />
          <Tabs.Expander />
        </Tabs>
      </div>
    )
  }
}

export { SideMenu }
