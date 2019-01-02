import React from 'react'
import { Icon } from "@blueprintjs/core"
import { IconNames } from "@blueprintjs/icons"

function Rating (props) {
  return (
    <div className="rating-container">
      <div>
        {renderRating(props.rating)}
      </div>
      <p className="rating-text">({props.rating ? props.rating : 0})</p>
    </div>
  )
}
function renderRating(rating) {
  const roundedRating = rating ? Math.round(rating) : 0
  let list = []
  for(let i = 0; i < 5; i++) {
    if(i < roundedRating) {
      list.push(<Icon icon={IconNames.STAR} className="active-rating"></Icon>)
    } else {
      list.push(<Icon icon={IconNames.STAR_EMPTY} className="passive-rating"></Icon>)
    }
  }
  return list
}
  
export { Rating }
