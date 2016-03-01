"use strict"

import React from 'react'
import { Block } from './Gridfolio__block.jsx'
import * as helper from '../helpers.js'

export class Gridfolio extends React.Component{

  getBlocks(row, rowIndex) {
    const { FolioStyle, focusOnBlock } = this.props
    return row.map((block, i) => {
      return (
        <Block
          key={ i }
          FolioStyle={ FolioStyle }
          focusOnBlock={ (e, obj) => this.props.focusOnBlock(e, obj) }
          block={ block }
          rowIndex={ rowIndex }
          blockIndex={ i }
          row={ row } />
      )
    })
  }

  getRows() {
    const { Folio, FolioStyle, focusOnBlock } = this.props

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
          { this.getBlocks(row, i) }
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
