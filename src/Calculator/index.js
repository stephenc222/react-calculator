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
      return this.setState({
        calcDisplay: evaluateInfixExpression(infixExpression),
        infixExpression: [],
        currentToken: '',
        prevToken: ''
      })
    }
    const cleanedToken = currentToken.replace(/[+-/*]/, '')
    return this.setState({
      infixExpression,
      currentToken,
      prevToken,
      calcDisplay: cleanedToken.length ? cleanedToken : prevToken
    })
  }

  renderKey = (keyValue, index, keyType) => {
    return (
      <Button
        value={keyValue}
        keyType={keyType}
        onClick={this.onClick}
        key={`b_${index}`}
      />
    )  
  }
  
  renderOpKey = (keyValue, index) => {
    return this.renderKey(keyValue, index, 'opKey')
  }

  renderNumKey = (keyValue, index) => {
    return this.renderKey(keyValue, index, 'numKey')
  }

  renderKeyRows = (keyArr) => {
    const keyRows = []
    let currRowArr = []
    let currRow = 1
    const rowLength = 3
    keyArr.forEach((key, index) => {
      if (index === 0) {
        currRowArr = [0, '.']
        keyRows.push(currRowArr)
        currRowArr = []
      } else if (index < currRow * rowLength) {
        currRowArr.push(key)
      } else {
        currRowArr.push(key)
        keyRows.push(currRowArr)
        currRowArr = []
        currRow++
      }
    })
    // the row with only two elements looks better on bottom
    keyRows.push(keyRows.shift())
    return keyRows.map( (keyRow, index) => {
      return (
        <div style={{display: 'flex', flexDirection: 'row'}} key={`kr_${index}`}>
          {keyRow.map(this.renderNumKey)}
        </div>
      ) 
    })
  }

  render() {
    const { calcDisplay } = this.state
    return (
      <div style={{display: 'flex', border: '1px solid red', flexDirection: 'column', justifyContent: 'center'}}>
        <div style={{ width:'100%', height: '50px', background: 'lightgrey'}}>
          <Display calcDisplay={calcDisplay}/>
        </div>
        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', flexGrow: 1}}>
          <div id='numKeys' style={{display: 'flex', flexDirection: 'column',  border: '1px solid black'}}>
            {this.renderKeyRows(numKeys)}
          </div>
          <div id='opKeys' style={{border: '1px solid green'}}>
            {opKeys.map(this.renderOpKey)}
          </div>
        </div>
      </div>
    )
  }
}
