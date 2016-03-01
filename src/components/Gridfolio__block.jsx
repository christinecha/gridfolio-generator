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
    const { block, row, FolioStyle } = this.props

    let padding = block.toJS().outerPadding || FolioStyle.toJS().block.outerPadding
    let blockWidth = (this.state.windowWidth / row.toJS().length) - (padding * 2)
    let blockHeight = blockWidth * (block.toJS().customHeight || FolioStyle.toJS().block.heightRatio)

    if (block.toJS().customWidth) {
      blockWidth = this.state.windowWidth * (block.toJS().customWidth || 1) - (padding * 2)
    }

    let blockTitlePosition = (blockHeight / 2) - ((block.toJS().titleFontSize || FolioStyle.toJS().block.title.fontSize) / 2)
    let isLinked = block.toJS().link ? "linked" : null
    let blockDisplay = "inline-block"

    // breakpoints
    blockWidth = helper.fitToMobile(this.state.windowWidth, row.toJS().length, padding, blockWidth)

    if (blockHeight < (block.toJS().titleFontSize || FolioStyle.toJS().block.title.fontSize) * 2) {
      blockHeight = (block.toJS().titleFontSize || FolioStyle.toJS().block.title.fontSize) * 2
      blockTitlePosition = (blockHeight / 2) - ((block.toJS().titleFontSize || FolioStyle.toJS().block.title.fontSize) / 2)
    }

    let blockHeightIncludingKeywords = blockHeight + parseInt(FolioStyle.toJS().block.keywords.marginTop || null) + parseInt(FolioStyle.toJS().block.keywords.marginBottom || null) + parseInt(FolioStyle.toJS().block.keyword.fontSize * 1.3 || null)

    if (blockHeightIncludingKeywords <= blockHeight) {
      blockHeightIncludingKeywords = blockHeight
    }

    let blockStyle = {
      outer: {
        width: blockWidth + 'px',
        height: blockHeightIncludingKeywords + 'px',
        padding: padding + 'px',
        display: blockDisplay
      },
      inner: {
        width: blockWidth + 'px',
        height: blockHeight + 'px',
        backgroundColor: block.toJS().backgroundColor || FolioStyle.toJS().block.backgroundColor,
        backgroundImage: block.toJS().image || null,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        textAlign: FolioStyle.toJS().block.textAlign,
        borderRadius: block.toJS().borderRadius || FolioStyle.toJS().block.borderRadius
      },
      title: {
        color: block.toJS().titleColor || FolioStyle.toJS().block.title.color,
        height: blockHeight - blockTitlePosition + 'px',
        paddingTop: blockTitlePosition + 'px',
        fontSize: block.toJS().titleFontSize || FolioStyle.toJS().block.title.fontSize + 'px',
        fontFamily: FolioStyle.toJS().block.title.fontFamily,
        textTransform: FolioStyle.toJS().block.title.textTransform,
        fontWeight: FolioStyle.toJS().block.title.fontWeight,
        backgroundColor: block.toJS().isTinted ? FolioStyle.toJS().block.tint : null,
        borderRadius: block.toJS().borderRadius || FolioStyle.toJS().block.borderRadius
      }
    }

    return (
      <div
        FolioStyle={ FolioStyle }
        style={ blockStyle.outer }
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
