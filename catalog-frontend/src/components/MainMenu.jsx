import React, { Component } from 'react'
import { Card, Elevation, Divider, Icon } from '@blueprintjs/core'
import { IconNames } from "@blueprintjs/icons"
import { Rating, Price } from './common';

class MainMenu extends Component {
  constructor(props) {
    super(props)
    this.state = {
      content: [
        {
          name: "fullstack Advanced React and GraphQL",
          description: "This is a course that will teach you everything you need to build a full stack application with React.js and GraphQL.",
          url: "https://advancedreact.com/",
          price: "50",
          rating: "2.5",
          user_name: "Mohammad Alhomaid",
          image: "https://advancedreact.com/images/square-small.jpg"
        },
        {
          name: "Fullstack Advanced React and GraphQL",
          description: "This is a course that will teach you everything you need to build a full stack application with React.js and GraphQL.",
          url: "https://advancedreact.com/",
          price: "50",
          rating: "3",
          user_name: "Mohammad Alhomaid",
          image: "https://advancedreact.com/images/square-small.jpg"
        },
        {
          name: "Fullstack Advanced React and GraphQL",
          description: "This is a course that will teach you everything you need to build a full stack application with React.js and GraphQL.",
          url: "https://advancedreact.com/",
          price: "50",
          rating: "3",
          user_name: "Mohammad Alhomaid",
          image: "https://advancedreact.com/images/square-small.jpg"
        },
        {
          name: "Fullstack Advanced React and GraphQL",
          description: "This is a course that will teach you everything you need to build a full stack application with React.js and GraphQL.",
          url: "https://advancedreact.com/",
          price: "50",
          rating: "3",
          user_name: "Mohammad Alhomaid",
          image: "https://advancedreact.com/images/square-small.jpg"
        },
        {
          name: "Fullstack Advanced React and GraphQL",
          description: "This is a course that will teach you everything you need to build a full stack application with React.js and GraphQL.",
          url: "https://advancedreact.com/",
          price: "50",
          rating: "3",
          user_name: "Mohammad Alhomaid",
          image: "https://advancedreact.com/images/square-small.jpg"
        },
        {
          name: "Fullstack Advanced React and GraphQL",
          description: "This is a course that will teach you everything you need to build a full stack application with React.js and GraphQL.",
          url: "https://advancedreact.com/",
          price: "50",
          rating: "3",
          user_name: "Mohammad Alhomaid",
          image: "https://advancedreact.com/images/square-small.jpg"
        },
        {
          name: "Fullstack Advanced React and GraphQL",
          description: "This is a course that will teach you everything you need to build a full stack application with React.js and GraphQL.",
          url: "https://advancedreact.com/",
          price: "50",
          rating: "3",
          user_name: "Mohammad Alhomaid",
          image: "https://advancedreact.com/images/square-small.jpg"
        },
        {
          name: "Fullstack Advanced React and GraphQL",
          description: "This is a course that will teach you everything you need to build a full stack application with React.js and GraphQL.",
          url: "https://advancedreact.com/",
          price: "50",
          rating: "3",
          user_name: "Mohammad Alhomaid",
          image: "https://advancedreact.com/images/square-small.jpg"
        },
        {
          name: "Fullstack Advanced React and GraphQL",
          description: "This is a course that will teach you everything you need to build a full stack application with React.js and GraphQL.",
          url: "https://advancedreact.com/",
          price: "50",
          rating: "3",
          user_name: "Mohammad Alhomaid",
          image: "https://advancedreact.com/images/square-small.jpg"
        },
        {
          name: "Fullstack Advanced React and GraphQL",
          description: "This is a course that will teach you everything you need to build a full stack application with React.js and GraphQL.",
          url: "https://advancedreact.com/",
          price: "50",
          rating: "3",
          user_name: "Mohammad Alhomaid",
          image: "https://advancedreact.com/images/square-small.jpg"
        },
        {
          name: "Fullstack Advanced React and GraphQL",
          description: "This is a course that will teach you everything you need to build a full stack application with React.js and GraphQL.",
          url: "https://advancedreact.com/",
          price: "50",
          rating: "3",
          user_name: "Mohammad Alhomaid",
          image: "https://advancedreact.com/images/square-small.jpg"
        },
        {
          name: "Fullstack Advanced React and GraphQL",
          description: "This is a course that will teach you everything you need to build a full stack application with React.js and GraphQL.",
          url: "https://advancedreact.com/",
          price: "50",
          rating: "3",
          user_name: "Mohammad Alhomaid",
          image: "https://advancedreact.com/images/square-small.jpg"
        },
      ]
    }
    this.handleClick = this.handleClick.bind(this)
  }
  handleClick(e) {
    //SW
  }
  render() {
    return (
      <div className="App-Main-Container">
        {this.state.content.map((item) => {
          return <Card className="Main-Menu-Card" onclick={this.handleClick} interactive={true} elevation={Elevation.TWO}>
            <div class="Main-Menu-Card-Image-Container">
              <img className="Main-Menu-Card-Image" src={item.image} alt={item.name} />
            </div>
            <Divider />
            <strong className="capitalize left-allign title">{item.name}</strong>
            <p className="capitalize left-allign subtitle">{item.name}</p>
            <div className="item-price-rating-container">
              <Rating rating={item.rating} />
              <Price price={item.price} />
            </div>
            <div className="item-user-container">
              <Icon style={{ color: '#999' }} icon={IconNames.USER}/>
              <p className="item-user-name">{item.user_name}</p>
            </div>
          </Card>
        })}
      </div>
    )
  }
}

export { MainMenu }
