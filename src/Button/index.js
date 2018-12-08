import React, { Component } from 'react'

const Button = (props) => {
  const { name, onClick, value } = props
  return (
    <div>
      <input value={value} onClick={onClick} type="button" name={name}/>
    </div>
  )
}

export default Button
