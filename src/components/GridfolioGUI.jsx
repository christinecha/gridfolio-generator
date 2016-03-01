"use strict"

import React from 'react'
import { connect } from 'react-redux'
import { Slider } from './GridfolioGUI__slider.jsx'
import { Gridfolio } from './Gridfolio.jsx'
import { Folio, FolioStyle } from '../myGridfolio.js'
import * as action from '../actions.js'
import * as helper from '../helpers.js'

export class GridfolioGUI extends React.Component{

  getSliders(properties, propertyParents) {
    let propertiesArray = Object.keys(properties)
    return propertiesArray.map((propertyName, i) => {
      let propertyValue = properties[propertyName]

      if (typeof propertyValue == "string" || typeof propertyValue == "number") {
        return (
          <Slider
            key={i}
            updateFolio={(stateObj, propertyParents) => this.updateFolio(stateObj, propertyParents)}
            propertyParents={propertyParents}
            propertyName={propertyName}
            propertyValue={propertyValue} />
        )
      } else {
        return null
      }

    })
  }

  updateFolio(stateObj, propertyParents) {
    const { dispatch, FolioStyle } = this.props
    dispatch(action.UPDATE_FOLIO_PROPERTY(stateObj, propertyParents, FolioStyle))
  }

  render() {

    const { FolioStyle, Folio } = this.props

    return (
      <div>
        <div className="toolbar">
          <form onSubmit={() => this.updateFolio()}>
            <div>
              block styles
              {this.getSliders(FolioStyle.toJS().block, ["block"])}
              <hr />
            </div>
            <div>
              title styles
              {this.getSliders(FolioStyle.toJS().block.title, ["block", "title"])}
              <hr />
            </div>
            <div>
              keyword container styles
              {this.getSliders(FolioStyle.toJS().block.keywords, ["block", "keywords"])}
              <hr />
            </div>
            <div>
              keyword styles
              {this.getSliders(FolioStyle.toJS().block.keyword, ["block", "keyword"])}
              <hr />
            </div>
          </form>
        </div>
        <Gridfolio
          FolioStyle={FolioStyle}
          Folio={Folio} />
      </div>
    )
  }
}


function mapStateToProps(state) {
  return {
    FolioStyle: state.get('FolioStyle'),
    Folio: state.get('Folio')
  }
}

export const GridfolioGUIContainer = connect(mapStateToProps)(GridfolioGUI);
