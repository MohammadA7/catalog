import React from 'react'
import { Card, Elevation, Divider, Icon } from '@blueprintjs/core'
import { IconNames } from "@blueprintjs/icons"
import { Rating, Price } from './';

function Menu(props) {
  return (
    <div className="App-Main-Container">
        {props.content.map((item) => {
          return <Card className="Main-Menu-Card" onclick={props.handleClick} interactive={true} elevation={Elevation.TWO}>
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


export { Menu } 
