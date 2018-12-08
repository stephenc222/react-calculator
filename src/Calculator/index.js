import React, { Component } from 'react'
import Button from './Button'
import Display from './Display'
import evaluateInfixExpression from './evaluateInfixExpression'

// constants of the calculator keys
const numKeys = [0,1,2,3,4,5,6,7,8,9]
const opKeys = ['+', '-', '*', '/', '=']

export default class Calculator extends Component {
  constructor(props) {
    super(props)
    this.state = {
      calcDisplay: '',
      currentToken: '',
      prevToken: '',
      infixExpression: []
    }
  }

  onClick = (event) => {
    let { currentToken, prevToken } = this.state
    const infixExpression = this.state.infixExpression.slice()
    const value = event.target.value
    if (opKeys.includes(value) && value !== '=') {
      infixExpression.push(currentToken)
      prevToken = currentToken
      currentToken = value
      infixExpression.push(currentToken)
    } else if (numKeys.includes(+value)){
      currentToken += value
      currentToken = currentToken.replace(/[+-/*]/, '')
    }
    if (infixExpression.length && value === '=') {
      infixExpression.push(currentToken)
      return this.setState({calcDisplay: evaluateInfixExpression(infixExpression), infixExpression: [], currentToken: '', prevToken: ''})
    }
    const cleanedToken = currentToken.replace(/[+-/*]/, '')
    this.setState({
      infixExpression,
      currentToken,
      prevToken,
      calcDisplay: cleanedToken.length ? cleanedToken : prevToken
    })
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
