"use strict"

import React from 'react'
import { Block } from './Gridfolio__block.jsx'
import * as helper from '../helpers.js'

export class Gridfolio extends React.Component{

  getBlocks(row) {
    const { FolioStyle } = this.props

    return row.map((block, i) => {
      return (
        <Block
          key={ i }
          FolioStyle={ FolioStyle }
          block={ block }
          row={ row } />
      )
    })
  }

  getRows() {
    const { Folio, FolioStyle } = this.props

    return Folio.map((row, i) => {

      let rowStyle = {
        maxWidth: FolioStyle.toJS().body.maxWidth
      }

      return (
        <div
          className="folio-row"
          FolioStyle={ FolioStyle }
          style={ rowStyle }
          key={ i }>
          { this.getBlocks(row) }
        </div>
      )
    })
  }

  render() {
    return (
      <div>
        { this.getRows() }
      </div>
    )
  }
}
