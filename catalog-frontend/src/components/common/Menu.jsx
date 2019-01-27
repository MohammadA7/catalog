import React from 'react'
import { Card, Elevation, Divider, Icon, Text } from '@blueprintjs/core'
import { IconNames } from "@blueprintjs/icons"
import { Rating, Price } from './';
import { Link } from 'react-router-dom'


function Menu(props) {
  return (
    <div className="App-Main-Container">
      {props.content.map((item) => {
        return <Link key={item.id} to={`/${item.category_id}/${item.id}`}>
          <Card className="Main-Menu-Card" onClick={props.handleClick} interactive={true} elevation={Elevation.TWO}>
            <div className="Main-Menu-Card-Image-Container">
              <img className="Main-Menu-Card-Image" src={item.image_path} alt={item.name} />
            </div>
            <Divider />
            <Text className="capitalize left-align title">{item.name}</Text>
            <Text ellipsize={true} className="capitalize left-align subtitle">{item.description}</Text>

            <div className="item-price-rating-container">
              <Rating rating={item.rating} />
              <Price price={item.price} />
            </div>
            <div className="item-user-container">
              <Icon style={{ color: '#999' }} icon={IconNames.USER} />
              <p className="item-user-name">{item.user_name}</p>
            </div>
          </Card>
        </Link>
      })}
    </div>
  )
}


export { Menu } 
