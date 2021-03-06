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
    const { dispatch, focus } = this.props
    let propertiesArray = properties? Object.keys(properties) : []
    let blockIdentifier = null

    if (focus) {
      blockIdentifier = focus.toJS().rowIndex + '' + focus.toJS().blockIndex
    }

    return propertiesArray.map((propertyName, i) => {
      let propertyValue = properties[propertyName]

      if (typeof propertyValue == "string" || typeof propertyValue == "number") {
        return (
          <InputField
            key={i + blockIdentifier}
            updateFolio={(stateObj, propertyParents) => this.updateFolio(stateObj, propertyParents)}
            propertyParents={propertyParents}
            propertyName={propertyName}
            propertyValue={propertyValue} />
        )
      } else if (typeof propertyValue == "object") {
        let newParents = propertyParents.slice()
            newParents.push(propertyName)

        return this.getInputs(propertyValue, newParents)
      } else {
        return null
      }
    })
  }

  updateFolio(stateObj, propertyParents) {
    const { dispatch, Folio, FolioStyle, focus } = this.props
    dispatch(action.UPDATE_FOLIO_PROPERTY(stateObj, propertyParents, Folio, FolioStyle, focus))
  }

  removeFocus(e) {
    e.preventDefault()
    const { dispatch } = this.props
    dispatch(action.UPDATE_FOCUS(null))
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
        return (
          <div>
            <button onClick={(e) => this.removeFocus(e)}>back to overall styles</button>
            {this.getInputs(displayData, parents)}
            <button>add a block to this row</button>
            <button>remove this block</button>
          </div>
        )
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
