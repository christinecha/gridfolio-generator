"use strict"

import React from 'react'
import * as helper from '../helpers.js'

export class Keywords extends React.Component{

  getKeywords(keywords) {
    const { FolioStyle } = this.props

    if (!keywords) {
      return null
    } else {
      return keywords.map((keyword, i) => {

        let keywordStyle = {
          fontSize: FolioStyle.toJS().block.keyword.fontSize + 'px',
          fontFamily: FolioStyle.toJS().block.keyword.fontFamily,
          textTransform: FolioStyle.toJS().block.keyword.textTransform,
          margin: '0 2px',
          color: FolioStyle.toJS().block.keyword.color,
          backgroundColor: FolioStyle.toJS().block.keyword.backgroundColor,
          padding: FolioStyle.toJS().block.keyword.padding,
          fontWeight: FolioStyle.toJS().block.keyword.fontWeight,
        }

        return (
          <div
            style={ keywordStyle }
            className="folio-block--keyword"
            key={ i }>
            { keyword }
          </div>
        )
      })
    }
  }

  render() {
    const { keywords, FolioStyle } = this.props

    let keywordsStyle = {
      textAlign: FolioStyle.toJS().block.keywords.textAlign || 'center',
      marginTop: FolioStyle.toJS().block.keywords.marginTop || null + 'px',
      marginBottom: FolioStyle.toJS().block.keywords.marginBottom || null + 'px',
    }

    return (
      <div
        style={ keywordsStyle }
        className="folio-block--keywords">
        { this.getKeywords(keywords) }
      </div>
    )
  }
}
