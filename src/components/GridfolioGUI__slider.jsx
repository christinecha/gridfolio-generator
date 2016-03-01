"use strict"

import React from 'react'
import * as helper from '../helpers.js'

export class Slider extends React.Component{

  constructor(props) {
    super(props)
    const { propertyName, propertyParents, propertyValue } = this.props
    let stateObj = {}
        stateObj[propertyName] = propertyValue
    this.state = stateObj
  }

  handleInputChange(e) {
    const { propertyName, propertyParents, propertyValue, updateFolio } = this.props
    let newStateObj = {}
    newStateObj[propertyName] = e.target.value
    this.setState(newStateObj)
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state !== prevState) {
      const { propertyParents, updateFolio } = this.props
      updateFolio(this.state, propertyParents)
    }
  }

  render() {
    const { propertyName, propertyPath, propertyValue } = this.props

    return (
      <div>
        {propertyName}
        <input
          value={this.state[propertyName]}
          onChange={(e) => this.handleInputChange(e)} />
      </div>
    )
  }
}
