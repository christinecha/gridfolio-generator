import * as helper from './helpers.js'

export const UPDATE_FOLIO_PROPERTY = (stateObj, propertyParents, Folio, FolioStyle, focus) => {
  let propertyName = Object.keys(stateObj)[0]
  let newFolio = Folio.toJS()
  let newFolioStyle = FolioStyle.toJS()

  let path = newFolioStyle

  if (propertyParents[0] == "Folio") {
    path = newFolio[focus.toJS().rowIndex][focus.toJS().blockIndex]
  }

  propertyParents.forEach((parent, i) => {
    if (i > 0) {
      path = path[parent]
    }
  })
// debugger
  path[propertyName] = stateObj[propertyName]

  return {
    type: 'UPDATE_FOLIO_PROPERTY',
    data: {
      FolioStyle: newFolioStyle,
      Folio: newFolio
    }
  }
}

export const UPDATE_FOCUS = (newFocus) => {
  return {
    type: 'UPDATE_FOCUS',
    data: {
      focus: newFocus
    }
  }
}
