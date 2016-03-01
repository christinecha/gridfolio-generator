"use strict"

export const isEven = (int) => {
  return int % 2 === 0
}

export const calculateBlockStyle = (windowWidth, block, row, FolioStyle) => {
  let padding = block.toJS().outerPadding || FolioStyle.toJS().block.outerPadding
  let blockWidth = (windowWidth / row.toJS().length) - (padding * 2)
  let blockHeight = blockWidth * (block.toJS().customHeight || FolioStyle.toJS().block.heightRatio)

  if (block.toJS().customWidth) {
    blockWidth = windowWidth * (block.toJS().customWidth || 1) - (padding * 2)
  }

  let blockTitlePosition = (blockHeight / 2) - ((block.toJS().titleFontSize || FolioStyle.toJS().block.title.fontSize) / 2)
  let blockDisplay = "inline-block"

  // breakpoints
  blockWidth = fitToMobile(windowWidth, row.toJS().length, padding, blockWidth)

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

  return blockStyle
}

export const fitToMobile = (windowWidth, rowLength, padding, blockWidth) => {
  if (windowWidth < 500) {
    return (windowWidth) - (padding * 2)
  } else if (windowWidth < 900 && rowLength <= 4) {
    if (isEven(rowLength)) {
      return (windowWidth / 2) - (padding * 2)
    } else {
      return (windowWidth) - (padding * 2)
    }
  } else {
    return blockWidth
  }
}
