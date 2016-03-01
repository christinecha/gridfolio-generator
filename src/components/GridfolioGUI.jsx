"use strict"

import React from 'react'
import { connect } from 'react-redux'
import { InputField } from './GridfolioGUI__input.jsx'
import { Gridfolio } from './Gridfolio.jsx'
import { Folio, FolioStyle } from '../myGridfolio.js'
import * as action from '../actions.js'
import * as helper from '../helpers.js'

export class GridfolioGUI extends React.Component{

  getInputs(properties, propertyParents) {
    let propertiesArray = Object.keys(properties)

    return propertiesArray.map((propertyName, i) => {
      let propertyValue = properties[propertyName]

      if (typeof propertyValue == "string" || typeof propertyValue == "number") {
        console.log('new input', propertyValue, i)
        return (
          <InputField
            key={i + propertyValue}
            updateFolio={(stateObj, propertyParents) => this.updateFolio(stateObj, propertyParents)}
            propertyParents={propertyParents}
            propertyName={propertyName}
            propertyValue={propertyValue} />
        )
      } else if (typeof propertyValue == "object") {
        let newParents = propertyParents
            newParents.push(propertyName)

        return this.getInputs(propertyValue, newParents)
      } else {
        return null
      }
    })
  }

  updateFolio(stateObj, propertyParents) {
    const { dispatch, FolioStyle } = this.props
    dispatch(action.UPDATE_FOLIO_PROPERTY(stateObj, propertyParents, FolioStyle))
  }

  focusOnBlock(e, obj) {
    e.preventDefault()
    const { dispatch } = this.props
    dispatch(action.UPDATE_FOCUS(obj))
  }

  displayToolbar() {
    const { dispatch, Folio, FolioStyle, focus } = this.props
    let displayData = FolioStyle.toJS()
    let parents = ["FolioStyle"]

    if (focus) {
      const { type, blockIndex, rowIndex } = focus.toJS()

      if (type == "block") {
        displayData = Folio.toJS()[rowIndex][blockIndex]
        parents = ["Folio"]
      }
    }

    return this.getInputs(displayData, parents)
  }

  render() {
    const { FolioStyle, Folio, focus } = this.props

    return (
      <div>
        <div className="toolbar">
          { this.displayToolbar() }
        </div>
        <Gridfolio
          FolioStyle={ FolioStyle }
          Folio={ Folio }
          focusOnBlock={ (e, obj) => this.focusOnBlock(e, obj) } />
      </div>
    )
  }
}


function mapStateToProps(state) {
  return {
    FolioStyle: state.get('FolioStyle'),
    Folio: state.get('Folio'),
    focus: state.get('focus')
  }
}

export const GridfolioGUIContainer = connect(mapStateToProps)(GridfolioGUI);
