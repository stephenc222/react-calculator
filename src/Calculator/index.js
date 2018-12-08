import React, { Component } from 'react'
import Button from '../Button'
import Display from '../Display'

const numKeys = [0,1,2,3,4,5,6,7,8,9]
const opKeys = ['+', '-', 'x', '/', '=']

export default class Calculator extends Component {
  constructor(props) {
    super(props)
    this.state = {
      calcDisplay: '',
      firstOp: null,
      secondOp: null,
      operation: ''
    }
  }

  onClick = (event) => {
    console.warn('clicked', { name: event.target.name, value: event.target.value })
    const value = event.target.value
    if (opKeys.indexOf(value) > -1) {
      console.log('is opKey', {value})
    } else {
      console.log('is numKey', {value})
    }
    this.setState({calcDisplay: event.target.value})
  }

  render() {
    const { calcDisplay } = this.state
    return (
      <div style={{border: '1px solid red'}}>
        <div style={{ width: '550px', height: '50px', background: 'lightgrey'}}>
          <Display calcDisplay={calcDisplay}/>
        </div>
        <div id='numKeys' style={{border: '1px solid black'}}>
          {numKeys.map( ( numKey, index ) => <Button value={numKey} onClick={this.onClick} name={numKey} key={`n_${index}`} /> ) }
        </div>
        <div id='opKeys' style={{border: '1px solid green'}}>
          {opKeys.map( ( opKey, index ) => <Button value={opKey} onClick={this.onClick} name={opKey} key={`k_${index}`} /> ) }
        </div>
      </div>
    )
  }
}
