import React from 'react'
import { Icon } from "@blueprintjs/core"
import { IconNames } from "@blueprintjs/icons"

function Rating (props) {
  return (
    <div className="rating-container">
      {renderRating(props.rating)}
      <p className="rating-text">({props.rating ? Number.parseFloat(props.rating).toPrecision(2) : 0})</p>
    </div>
  )
}
function renderRating(rating) {
  const roundedRating = rating ? Math.round(rating) : 0
  let list = []
  for(let i = 0; i < 5; i++) {
    if(i < roundedRating) {
      list.push(<Icon key={i} icon={IconNames.STAR} style={{ color: '#ecbb34'}}></Icon>)
    } else {
      list.push(<Icon key={i} icon={IconNames.STAR_EMPTY} style={{ color: '#999'}}></Icon>)
    }
  }
  return list
}
  
export { Rating }
