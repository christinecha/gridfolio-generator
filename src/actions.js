import * as helper from './helpers.js'

export const UPDATE_FOLIO_PROPERTY = (stateObj, propertyParents, FolioStyle) => {
  let propertyName = Object.keys(stateObj)[0]
  let newFolioStyle = FolioStyle.toJS()

  let path = newFolioStyle

  propertyParents.forEach((parent) => {
    path = path[parent]
  })

  path[propertyName] = stateObj[propertyName]

  return {
    type: 'UPDATE_FOLIO_PROPERTY',
    data: {
      FolioStyle: newFolioStyle
    }
  }
}
