import React from 'react'

const Display = (props) => {
  const { calcDisplay } = props
  return (
    <div 
      style={{
        fontSize: '18px',
      }}>
      {calcDisplay}
    </div>
  )
}

export default Display 
