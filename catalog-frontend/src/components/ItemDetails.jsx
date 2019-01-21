import React from 'react'

function ItemDetails({ match }) {
  return (
    <div>
      {match.params.item}
    </div>
  )
}
export { ItemDetails }
