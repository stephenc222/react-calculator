import React from 'react'
import './index.css'

const Button = (props) => {
  const { name, onClick, value } = props
  return (
    <div style={{display: 'flex', height: '50px', width: '50px', padding: '1px'}}>
      <input
        value={value}
        style={{
          backgroundColor: '#F6F6F6',
          fontSize: '18px',
          cursor: 'pointer',
          width: '100%',
          height: '100%',
        }}
        onClick={onClick}
        type="button"
        name={name}
      />
    </div>
  )
}

export default Button
