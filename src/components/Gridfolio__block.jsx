"use strict"

import React from 'react'
import { Keywords } from './Gridfolio__keywords.jsx'
import * as helper from '../helpers.js'

export class Block extends React.Component{

  constructor(props) {
    super(props)
    const { FolioStyle } = this.props

    let newWidth = parseInt(window.innerWidth)
    if (newWidth >= FolioStyle.toJS().body.maxWidth) {
      newWidth = FolioStyle.toJS().body.maxWidth
    }
    this.state = {
      windowWidth: newWidth
    }
  }

  componentDidMount() {
    const { FolioStyle } = this.props

    window.addEventListener('resize', () => {
      let newWidth = parseInt(window.innerWidth)
      if (newWidth >= FolioStyle.toJS().body.maxWidth) {
        newWidth = FolioStyle.toJS().body.maxWidth
      }
      this.setState({
        windowWidth: newWidth
      })
    })
  }

  render() {
    const { block, blockIndex, row, rowIndex, FolioStyle, focusOnBlock } = this.props

    let blockStyle = helper.calculateBlockStyle(this.state.windowWidth, block, row, FolioStyle)
    let isLinked = block.toJS().link ? "linked" : null
    let blockObj = {
      type: "block",
      rowIndex: rowIndex,
      blockIndex: blockIndex
    }

    return (
      <div
        FolioStyle={ FolioStyle }
        style={ blockStyle.outer }
        onClick={(e) => focusOnBlock(e, blockObj)}
        className={"folio-block " + isLinked}>
        <div style={ blockStyle.inner }>
          <a href={ block.toJS().link }>
            <div style={ blockStyle.title }>
              { block.toJS().title }
            </div>
          </a>
        </div>
        <Keywords
          FolioStyle={ FolioStyle }
          keywords={block.toJS().keywords } />
      </div>
    )
  }
}
