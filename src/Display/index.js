import React, { Component } from 'react'

const Display = (props) => {
  const { calcDisplay } = props
  return (
    <div>
      {calcDisplay}
    </div>
  )
}

export default Display 
